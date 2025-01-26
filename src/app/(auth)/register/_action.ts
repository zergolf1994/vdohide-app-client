"use server"
import { env } from "@/env.mjs";
import { VerificationEnum } from "@/lib/enums";
import { sendEmail } from "@/lib/mailers/mailer";
import { verifyEmailTemplate } from "@/lib/mailers/template";
import UserModel from "@/models/user.model";
import VerificationCodeModel from "@/models/verification.model";
import { registerSchema, registerSchemaType } from "@/validators/auth.validator"
import { AuthError } from "next-auth";

export const ActionRegister = async (
    values: registerSchemaType,
) => {
    try {

        const validator = registerSchema.safeParse(values);
        if (!validator.success) {
            throw new Error(validator.error.errors.map(err => err.message).join(', '));
        }

        const { name, email, password, confirmPassword } = validator.data
        const existingUser = await UserModel.exists({
            email,
        });
        if (existingUser) {
            throw new Error(
                "User already exists with this email",
            );
        }

        const newUser = await UserModel.create({
            name,
            email,
            password,
        });

        const userId = newUser._id;

        const verification = await VerificationCodeModel.create({
            userId,
            type: VerificationEnum.EMAIL_VERIFICATION
        });

        const verificationUrl = `${env.NEXT_PUBLIC_APP_URL}/verify-email?code=${verification._id}`;

        //console.log("verificationUrl", verificationUrl)
        
        await sendEmail({
            to: newUser.email,
            ...verifyEmailTemplate({
                username: newUser.name,
                url: verificationUrl
            }),
        });
        return {
            message: "User registered successfully",
            request_verify: true,
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    error.message = "Invalid credentials!"
                    break
                default:
                    error.message = "Something went wrong!"
                    break
            }
        }
        throw error
    }
}