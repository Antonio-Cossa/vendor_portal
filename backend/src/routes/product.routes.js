import { Router } from 'express'
import { validate } from '../middlewares/validate.js'
import { newProductSchema, updateProductSchema, updateStockSchema } from '../validators/product.validator.js'
import { newProduct, updateProduct, getProductInfo, listProducts } from '../controllers/product.controller.js'
import { authenticate } from '../middlewares/auth.middleware.js'
import { updateStock } from '../controllers/inventory.controller.js'

const router = Router()

router.get("/", authenticate, listProducts)
router.get("/:id", authenticate, getProductInfo)
router.post("/", authenticate, validate(newProductSchema), newProduct)
router.patch("/:id/stock", authenticate, validate(updateStockSchema), updateStock)
router.patch("/:id", authenticate, validate(updateProductSchema), updateProduct)

export default router