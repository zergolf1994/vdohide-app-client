"use server"
import { signIn } from "@/auth"
import { loginSchemaType } from "@/validators/auth.validator"
import { AuthError } from "next-auth";

export const ActionLogin = async (
    values: loginSchemaType,
) => {
    try {
        await signIn("credentials", {
            ...values,
            redirect: false
        });
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