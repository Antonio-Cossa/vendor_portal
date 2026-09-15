import Product from "../models/Product.js";

export const updateStock = async (req, res) => {
    try {
        const { operation, quantity } = req.body
        const vendor = req.vendor

        const filter = {
            vendorId: vendor._id,
            _id: req.params.id
        }

        let update

        if (operation === "increase") {
            update = {
                $inc: {
                    stock: quantity
                }
            }
        } else {
            update = {
                $inc: {
                    stock: -quantity
                }
            }

            filter.stock = {
                $gte: quantity
            }

        }

        const product = await Product.findOneAndUpdate(filter, update, { returnDocument: "after", runValidators: true })

        if (!product) {
            return res.status(409).json({ success: false, message: operation === "decrease" ? "stock insuficiente" : "Produto nao encontrado" })
        }

        return res.json({ success: true, message: "stock atualizado com sucesso", product })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}