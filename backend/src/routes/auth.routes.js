import { Router } from "express";
import { register, login, logout, me, updateVendor } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema, updateVendorSchema } from "../validators/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/logout", logout)
router.get("/me", authenticate, me)
router.patch("/", validate(updateVendorSchema), authenticate, updateVendor)

export default router