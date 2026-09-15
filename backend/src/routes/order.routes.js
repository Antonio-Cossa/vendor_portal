import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware.js'
import { changeOrderStatus, confirmOrder, createNewOrder, getOrderInfo, listOrders } from '../controllers/order.controller.js'

const router = Router()

router.get("/", authenticate, listOrders)
router.get("/:id", authenticate, getOrderInfo)
router.post("/", authenticate, createNewOrder)
router.patch("/:id/status", authenticate, changeOrderStatus)
router.patch("/:id/confirm", authenticate, confirmOrder)

export default router