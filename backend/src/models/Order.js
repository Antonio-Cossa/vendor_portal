import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    sku: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    quantity: {
        type: Number,
        min: 1,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    subTotal: {
        type: Number,
        required: true,
        min: 0
    }

}, { _id: false })

const orderSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Types.ObjectId,
        ref: "Vendor",
        required: true,
        index: true
    },
    orderName: {
        type: String,
        required: true,
        trim: true
    },
    items: {
        type: [orderItemSchema],
        required: true,
        validate: {
            validator: value => value.length > 0,
            message: "A encomenda precisa conter pelo menos um item"
        }
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    confirmedAt: {
        type: Date,
        default: null
    }

}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order