import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const vendorSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    companyAddress: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },
    contactName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 12
    },
    bankDetails: {
        bankName: {
            type: String,
            trim: true,
            maxlength: 200,
            default: null
        },
        accountHolder: {
            type: String,
            trim: true,
            default: null

        },
        accountNumber: {
            type: String,
            trim: true,
            default: null
        }
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, { timestamps: true })


vendorSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 11)
    }
})

const Vendor = mongoose.model("vendor", vendorSchema)

export default Vendor