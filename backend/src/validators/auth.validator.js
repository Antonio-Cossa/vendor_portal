import { z } from 'zod'

const emailSchema = z.string().trim().min(2)
const passwordSchema = z.string().trim().min(12)

export const registerSchema = z.object({
    companyName: z.string().trim().max(200).min(2),
    companyAddress: z.string().trim().max(300).min(2),
    contactName: z.string().trim().max(200).min(2),
    email: emailSchema,
    password: passwordSchema,
    phone: z.string().trim().max(100),

})

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export const updateVendorSchema = registerSchema.partial().merge(
    z.object({
        bankDetails: z.object({
            bankName: z.string().trim().max(200),
            accountHolder: z.string().trim(),
            accountNumber: z.string().trim()
        })
    })
);