import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Vendor from '../models/Vendor.js'


const generateToken = (vendorId) => {
    return jwt.sign(
        {
            sub: vendorId
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    )
}

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV = "production",
    sameSite: process.env.NODE_ENV = "production" ? "none" : "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000
}

export const register = async (req, res) => {
    try {
        const { companyName, companyAddress, phone, contactName, email, password } = req.body

        const existingVendor = await Vendor.findOne({ email })

        if (existingVendor) {
            return res.status(409).json({ message: "Email ja em uso", success: false })
        }

        const vendor = await Vendor.create({ companyName, companyAddress, phone, contactName, email, password })

        const token = generateToken(vendor._id)

        const vendorObject = vendor.toObject()
        const { password: vendorPassword, ...sanitizedVendor } = vendorObject

        res.cookie("token", token, cookieOptions).status(201).json({ success: true, message: "Fornecedor registado com sucesso", vendor: sanitizedVendor })

    } catch (e) {
        console.error(e.message)

        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const vendor = await Vendor.findOne({ email }).select("+password")

        if (!vendor) {
            return res.status(401).json({ message: "Credenciais Invalidas", success: false })
        }

        const isValidPassword = await bcrypt.compare(password, vendor.password)

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Credenciais Invalidas"
            })
        } else if (vendor.status !== "active") {
            return res.status(403).json({ success: false, message: "Conta do fornecedor inativa" })
        }



        const token = generateToken(vendor._id)
        const vendorObject = vendor.toObject()

        const { password: vendorPassword, ...sanitizedVendor } = vendorObject
        res.cookie("token", token, cookieOptions).json({ success: true, message: "Autenticado com sucesso", vendor: sanitizedVendor })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ success: true, message: "Erro interno do servidor" })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token", cookieOptions)

    return res.json({
        success: true,
        message: "Desconectado com sucesso"
    })
}

export const me = (req, res) => {
    return res.json({ vendor: req.vendor })
}

export const updateVendor = async (req, res) => {
    try {
        const body = req.body

        const vendor = await Vendor.findByIdAndUpdate({ _id: req.vendor._id }, body, { runValidators: true, returnDocument: "after" })
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Usuario nao encontrado" })
        }

        return res.json({ success: true, message: "Usuario atualizado com sucesso", vendor })

    } catch (e) {

        if (e.code === 11000) {
            return res.status(409).json({ success: false, message: "Email ja esta em uso" })
        }

        console.error(e.message)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}