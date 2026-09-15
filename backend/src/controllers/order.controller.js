import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { isValidOrderTransitionStatus } from "../utils/orderStatus.util.js";


const revertStock = async (products) => {
    const promises = products.map(async (product) => {
        let filter = { vendorId: product.vendorId, _id: product._id }
        let update = {
            $inc: {
                stock: product.quantity
            }
        }

        await Product.findOneAndUpdate(filter, update)

    })

    await Promise.all(promises)

}

export const createNewOrder = async (req, res) => {
    let updatedProducts

    try {
        const vendor = req.vendor

        const orderItems = req.body.items
        const orderName = req.body.orderName

        const productFilterAndUpdate = []
        const missingStockProducts = []
        const nonExistingProducts = []

        for (const item of orderItems) {
            let update = {
                $inc: {
                    stock: -item.quantity
                }
            }

            let stock = { $gte: item.quantity }

            let filter = { ...item, stock, update }

            productFilterAndUpdate.push(filter)
        }


        const promises = productFilterAndUpdate.map(async (product) => {

            let filter = { vendorId: vendor._id, _id: product._id, stock: product.stock, status: "active" }

            const updatedProduct = await Product.findOneAndUpdate(filter, product.update, { returnDocument: "after" })

            if (updatedProduct === null) {
                const isValidProduct = await Product.findOne((({ stock, status, ...rest }) => rest)(filter))

                if (!isValidProduct || isValidProduct.status === "inactive") {
                    nonExistingProducts.push(product.name)
                    return null
                }

                missingStockProducts.push(product.name)
                return null
            }

            const finalObject = updatedProduct.toObject()
            finalObject.quantity = product.quantity
            return finalObject

        })


        const allProducts = await Promise.all(promises)


        updatedProducts = allProducts.filter(product => product !== null)


        if (nonExistingProducts.length > 0) {
            await revertStock(updatedProducts)
            return res.status(409).json({ success: false, message: `Encomenda cancelada por conter produtos inexistentes ou inativos: ${nonExistingProducts}` })
        } else if (missingStockProducts.length > 0) {
            await revertStock(updatedProducts)
            return res.status(409).json({ success: false, message: `Encomenda cancelada por insuficiencia de stock nos produtos: ${missingStockProducts}` })
        }

        let finalOrderItems = []
        let total = 0

        for (const product of updatedProducts) {

            let subTotal = Number((product.quantity * product.price).toFixed(2));

            const payload = {
                productId: product._id,
                productName: product.name,
                sku: product.sku,
                quantity: product.quantity,
                unitPrice: product.price,
                subTotal
            }

            finalOrderItems.push(payload)
            total = total + subTotal
        }
        const orderPayload = {
            vendorId: vendor._id,
            items: finalOrderItems,
            total: total.toFixed(2),
            orderName
        }

        const order = await Order.create(orderPayload)

        return res.json({ success: true, message: "Encomenda criada com sucesso", order })


    } catch (e) {
        console.error(e.message)
        await revertStock(updatedProducts)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}

export const listOrders = async (req, res) => {
    try {

        const vendor = req.vendor

        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1

        const skip = (page - 1) * limit

        const [orders, totalItems] = await Promise.all([
            Order.find({ vendorId: vendor._id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Order.countDocuments({ vendorId: vendor._id })]
        )

        const totalPages = Math.ceil(totalItems / limit)

        return res.json({
            success: true,
            orders,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviusPage: page > 1
            }
        })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }


}

export const getOrderInfo = async (req, res) => {
    try {

        const vendor = req.vendor

        const order = await Order.findOne({
            _id: req.params.id, vendorId: vendor._id
        })

        if (!order) {
            return res.status(404).json({ success: false, message: "Encomenda nao encontrada" })
        }

        return res.json({ success: true, order })
    } catch (e) {
        console.log(e.message)

        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}

export const changeOrderStatus = async (req, res) => {
    try {

        const vendor = req.vendor

        const filter = { vendorId: vendor._id, _id: req.params.id }

        if (req.body.status === "confirmed") {
            return res.status(400).json({ success: false, message: "O estado nao pode ser atualizado" })
        }

        const order = await Order.findOne(filter)
        const orderCurrentStatus = order.status
        const orderNextStatus = req.body.status

        const isValidTransition = isValidOrderTransitionStatus(orderCurrentStatus, orderNextStatus)
        console.log(req.body)
        console.log(isValidTransition)
        if (!isValidTransition) {
            return res.status(400).json({ success: false, message: "Transicao do estado da encomenda invalida" })
        }

        order.status = orderNextStatus
        await order.save()

        return res.json({ success: true, message: "Estado da encomenda atualizado com sucesso", order })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const confirmOrder = async (req, res) => {
    try {

        const vendor = req.vendor

        const filter = { _id: req.params.id, vendorId: vendor._id, status: "pending", confrimedAt: null }

        const order = await Order.findOneAndUpdate(filter, { status: "confirmed", confirmedAt: Date.now() }, { returnDocument: "after" })

        if (!order) {
            return res.status(404).json({ success: false, message: "Encomenda nao encontrada ou cancelada" })
        }

        return res.json({
            success: true, message: "Encomenda confirmada com sucesso",
            order
        })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}