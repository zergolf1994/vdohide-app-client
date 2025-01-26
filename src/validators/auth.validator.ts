import { z } from "zod";

export const emailSchema = z.string().trim().email().min(1).max(255);
export const passwordSchema = z.string().trim().min(6).max(255);
export const verificationCodeSchema = z.string().trim().min(1).max(25);

export const registerSchema = z
    .object({
        name: z.string().trim().min(1).max(255),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((val) => val.password === val.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"],
    });

export type registerSchemaType = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    userAgent: z.string().optional(),
});

export type loginSchemaType = z.infer<typeof loginSchema>

export const verificationEmailSchema = z.object({
    code: verificationCodeSchema,
});

export type verificationEmailType = z.infer<typeof verificationEmailSchema>

export const resetPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
    verificationCode: z.string().optional(),
});

export type resetPasswordType = z.infer<typeof resetPasswordSchema>


export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>
