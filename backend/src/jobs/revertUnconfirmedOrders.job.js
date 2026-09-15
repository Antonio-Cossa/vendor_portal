import Product from "../models/Product.js"
import Order from "../models/Order.js"

const ttl = 2 * 60 * 1000

const revertUnconfirmedOrders = () => {
    const revertStock = async () => {

        try {

            const cutoffTime = new Date(Date.now() - ttl)

            const expiredOrders = await Order.find({ status: "pending", confirmedAt: null, createdAt: { $lt: cutoffTime } })

            if (expiredOrders.length <= 0) return

            const promises = expiredOrders.map(async (order) => {
                let orderItems = order.items

                for (const item of orderItems) {

                    let filter = { vendorId: order.vendorId, _id: item.productId }
                    let update = {
                        $inc: {
                            stock: item.quantity
                        }
                    }
                    await Product.findOneAndUpdate(filter, update)
                }

                await Order.findOneAndUpdate({ vendorId: order.vendorId, _id: order._id }, { status: "cancelled" })

                return
            })

            await Promise.all(promises)


        } catch (e) {
            console.error(e.message)
            console.log("Erro ao executar reversao de stock")
        }


    }

    revertStock()

    return setInterval(revertStock, ttl)
}

export default revertUnconfirmedOrders