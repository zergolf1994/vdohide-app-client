"use server"

import { env } from "@/env.mjs";
import { VerificationEnum } from "@/lib/enums";
import { sendEmail } from "@/lib/mailers/mailer";
import { passwordResetTemplate } from "@/lib/mailers/template";
import UserModel from "@/models/user.model";
import VerificationCodeModel from "@/models/verification.model";
import { forgotPasswordSchema, forgotPasswordType } from "@/validators/auth.validator"
import { AuthError } from "next-auth";

export const ActionForgotPassword = async (
    values: forgotPasswordType,
) => {
    try {
        const validator = forgotPasswordSchema.safeParse(values);
        if (!validator.success) {
            throw new Error(validator.error.errors.map(err => err.message).join(', '));
        }

        const { email } = validator.data
        const existingUser = await UserModel.findOne({
            email,
        }, { _id: 1, name: 1 });

        if (!existingUser) {
            return { status: true, message: "check you email" }
        }

        const existingCode = await VerificationCodeModel.exists({
            userId: existingUser?._id,
            type: VerificationEnum.PASSWORD_RESET
        });

        if (existingCode) {
            return { status: true, message: "A link to reset your password has been sent." }
        }

        const userId = existingUser._id;

        const verification = await VerificationCodeModel.create({
            userId,
            type: VerificationEnum.PASSWORD_RESET
        });

        const verificationUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?code=${verification._id}`;

        const send = await sendEmail({
            to: email,
            ...passwordResetTemplate({
                username: existingUser.name,
                url: verificationUrl
            }),
        });

        return { status: true, message: "check you email", redirect: true }
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