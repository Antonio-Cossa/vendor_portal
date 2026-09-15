import request from "supertest";
import mongoose from "mongoose";
import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
    beforeEach
} from "vitest";

import app from "../app.js";
import dataBaseConnection from "../config/database.js";

import Vendor from "../models/Vendor.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

let vendor;
let cookie;
let product;

beforeAll(async () => {
    await dataBaseConnection();
});

beforeEach(async () => {

    // Criar um vendedor único para este teste
    const vendorData = {
        companyName: `Concurrency Test ${Date.now()}`,
        companyAddress: "Maputo",
        contactName: "Test Vendor",
        phone: "840000000",
        email: `concurrency${Date.now()}@test.com`,
        password: "123456789012"
    };

    const registerResponse = await request(app)
        .post("/api/auth/register")
        .send(vendorData);

    expect([200, 201]).toContain(registerResponse.status);

    vendor = registerResponse.body.vendor;

    cookie = registerResponse.headers["set-cookie"];

    expect(vendor).toBeDefined();
    expect(cookie).toBeDefined();

    // Criar produto com stock 10
    product = await Product.create({
        vendorId: vendor._id,
        name: "Concurrency Product",
        sku: `CON-${Date.now()}`,
        category: "Test",
        price: 100,
        stock: 10,
        lowStockThreshold: 5,
        status: "active"
    });
});

afterAll(async () => {

    if (vendor?._id) {
        await Order.deleteMany({
            vendorId: vendor._id
        });

        await Product.deleteMany({
            vendorId: vendor._id
        });

        await Vendor.deleteOne({
            _id: vendor._id
        });
    }

    await mongoose.connection.close();
});

describe("Order concurrency", () => {

    it(
        "deve impedir que duas encomendas simultâneas ultrapassem o stock disponível",
        async () => {

            /*
             * Stock inicial:
             * 10 unidades
             *
             * Pedido A:
             * 7 unidades
             *
             * Pedido B:
             * 5 unidades
             *
             * Total solicitado:
             * 12 unidades
             *
             * Resultado esperado:
             * apenas uma encomenda pode ser confirmada.
             */

            const orderA = {
                orderName: "Pedido A",
                items: [
                    {
                        _id: product._id.toString(),
                        name: product.name,
                        quantity: 7
                    }
                ]
            };

            const orderB = {
                orderName: "Pedido B",
                items: [
                    {
                        _id: product._id.toString(),
                        name: product.name,
                        quantity: 5
                    }
                ]
            };

            // Disparar as duas requisições simultaneamente
            const [responseA, responseB] = await Promise.all([
                request(app)
                    .post("/api/orders")
                    .set("Cookie", cookie)
                    .send(orderA),

                request(app)
                    .post("/api/orders")
                    .set("Cookie", cookie)
                    .send(orderB)
            ]);

            const responses = [
                {
                    response: responseA,
                    quantity: 7
                },
                {
                    response: responseB,
                    quantity: 5
                }
            ];

            // Uma deve ter sucesso
            const successful = responses.filter(
                item =>
                    item.response.status === 200 ||
                    item.response.status === 201
            );

            // A outra deve ser rejeitada
            const conflicts = responses.filter(
                item => item.response.status === 409
            );

            expect(successful).toHaveLength(1);
            expect(conflicts).toHaveLength(1);

            /*
             * Verificar o stock final diretamente no banco.
             */
            const updatedProduct = await Product.findById(
                product._id
            );

            expect(updatedProduct).not.toBeNull();

            /*
             * Se A ganhou:
             *
             * 10 - 7 = 3
             *
             * Se B ganhou:
             *
             * 10 - 5 = 5
             *
             * Nunca pode ser:
             *
             * -2
             * ou outro valor inválido.
             */
            expect([3, 5]).toContain(
                updatedProduct.stock
            );

            expect(updatedProduct.stock).toBeGreaterThanOrEqual(0);

            /*
             * Descobrir qual pedido venceu.
             */
            const successfulOrder = successful[0];

            const successfulQuantity =
                successfulOrder.quantity;

            /*
             * O stock final deve corresponder
             * exatamente à quantidade reservada.
             */
            expect(updatedProduct.stock).toBe(
                10 - successfulQuantity
            );

            /*
             * Deve existir apenas uma encomenda criada.
             */
            const orders = await Order.find({
                vendorId: vendor._id
            });

            expect(orders).toHaveLength(1);

            /*
             * A quantidade da encomenda criada
             * deve ser 7 ou 5.
             */
            expect([7, 5]).toContain(
                orders[0].items[0].quantity
            );

            /*
             * Garantir que nunca foram reservadas
             * mais de 10 unidades.
             */
            expect(
                orders[0].items[0].quantity
            ).toBeLessThanOrEqual(10);
        }
    );
});