import { z } from 'zod'

export const newProductSchema = z.object({
    name: z.string().trim().max(200),
    sku: z.string().trim().max(50),
    category: z.string().trim().max(100),
    price: z.number().min(0),
    stock: z.number().min(0),
    status: z.enum(["active", "inactive"]).optional()
})

export const updateProductSchema = newProductSchema.partial()

export const updateStockSchema = z.object({
    quantity: z.number().int().min(0),
    operation: z.enum(["increase", "decrease"])
})