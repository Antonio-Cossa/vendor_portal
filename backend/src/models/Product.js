import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
        index: true
    },
    name: {
        type: String,
        trim: true,
        maxlength: 200
    },
    sku: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        maxlength: 50
    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true })

productSchema.index({ vendorId: 1, sku: 1 }, { unique: true })

const Product = mongoose.model("Product", productSchema)

export default Product