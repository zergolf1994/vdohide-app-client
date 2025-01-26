"use server"
import UserModel from "@/models/user.model";
// import { signIn } from "@/auth"
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


        return {
            message: "User registered successfully",
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