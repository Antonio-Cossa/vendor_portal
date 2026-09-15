import jwt from 'jsonwebtoken'
import Vendor from '../models/Vendor.js'

export const authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ success: false, message: "Autenticacao necessaria" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const vendor = await Vendor.findById(decoded.sub)
        if (!vendor) {
            return res.status(401).json({ success: false, message: "Autenticacao Invalida" })
        } else if (vendor.status !== "active") {
            return res.status(403).json({
                success: false, message: "Conta de fornecedor inativa"
            })
        }

        req.vendor = vendor
        next()
    } catch (e) {
        console.error(e.message)

        return res.status(500).json({ success: false, message: "Token invalido ou Expirado" })
    }
}