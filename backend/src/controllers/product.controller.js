import mongoose from "mongoose";
import Product from "../models/Product.js";

export const newProduct = async (req, res) => {
    try {
        const vendor = req.vendor

        const product = await Product.create({ ...req.body, vendorId: vendor._id })

        return res.status(201).json({ success: true, message: "Produto criado com sucesso", product })

    } catch (e) {

        if (e.code === 11000) {
            return res.status(409).json({ success: true, message: "SKU do produto ja existe" })
        }

        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const vendor = req.vendor
        if (req.body.stock) {
            return res.status(400).json({ success: false, message: "O stock nao pode ser atualizado" })
        }

        const product = await Product.findOneAndUpdate({ vendorId: vendor._id, _id: req.params.id }, req.body, { runValidators: true, returnDocument: "after" })

        if (!product) {
            return res.status(404).json({ success: false, message: "Produto nao encontrado" })
        }

        return res.json({ success: true, message: "Produto atualizado com sucesso", product })

    } catch (e) {

        if (e.code === 11000) {
            return res.status(409).json({ success: false, message: "SKU do produto ja existe" })
        }

        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const listProducts = async (req, res) => {
    try {
        const vendor = req.vendor;

        const page =
            parseInt(req.query.page) || 1;

        const limit =
            parseInt(req.query.limit) || 10;

        const status = req.query.status;
        const search = req.query.search;

        const skip = (page - 1) * limit;

        const query = {
            vendorId: vendor._id,
        };

        if (
            status &&
            status !== "all"
        ) {
            query.status = status;
        }

        if (search?.trim()) {
            const searchValue = search.trim();

            query.$or = [
                {
                    name: {
                        $regex: searchValue,
                        $options: "i",
                    },
                },
                {
                    sku: {
                        $regex: searchValue,
                        $options: "i",
                    },
                },
            ];

            if (
                mongoose.Types.ObjectId.isValid(
                    searchValue
                )
            ) {
                query.$or.push({
                    _id: searchValue,
                });
            }
        }

        const [products, totalItems] =
            await Promise.all([
                Product.find(query)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),

                Product.countDocuments(query),
            ]);

        const totalPages =
            Math.ceil(totalItems / limit);

        return res.json({
            success: true,
            products,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage:
                    page < totalPages,
                hasPreviusPage:
                    page > 1,
            },
        });
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            success: false,
            message:
                "Erro interno do servidor",
        });
    }
};

export const getProductInfo = async (req, res) => {
    try {

        const vendor = req.vendor

        const product = await Product.findOne({ vendorId: vendor._id, _id: req.params.id })

        if (!product) {
            return res.status(404).json({ success: false, message: "Produto nao encontrado" })
        }

        return res.json({ success: true, message: "Produto encontrado com sucesso", product })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}