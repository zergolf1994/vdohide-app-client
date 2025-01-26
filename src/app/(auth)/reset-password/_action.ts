"use server"
import { hashValue } from "@/lib/bcrypt.lib";
import { VerificationEnum } from "@/lib/enums";
import { sendEmail } from "@/lib/mailers/mailer";
import { passwordChangeTemplate } from "@/lib/mailers/template";
import SessionModel from "@/models/session.model";
import UserModel from "@/models/user.model";
import VerificationCodeModel from "@/models/verification.model";
import { resetPasswordSchema, resetPasswordType } from "@/validators/auth.validator"

export const ActionSetupPassword = async (
    values: resetPasswordType,
) => {
    try {
        const validator = resetPasswordSchema.safeParse(values);
        if (!validator.success) {
            throw new Error(validator.error.errors.map(err => err.message).join(', '));
        }

        const { verificationCode, password, confirmPassword } = validator.data

        const validCode = await VerificationCodeModel.findOne({
            _id: verificationCode,
            type: VerificationEnum.PASSWORD_RESET
        });

        if (!validCode) {
            return { status: true, message: "Invalid or expired reset link" }
        }

        const hashedPassword = await hashValue(password);

        const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId, {
            password: hashedPassword,
        });
        if (!updatedUser) {
            return { status: false, message: "Failed to reset password!" }
        }

        await validCode.deleteOne();

        await SessionModel.deleteMany({
            userId: updatedUser._id,
        });
        //ทำระบบ ส่งอีเมล์
        const send = await sendEmail({
            to: updatedUser?.email,
            ...passwordChangeTemplate({
                username: updatedUser.name,
            }),
        });

        console.log(send)
        return { status: true, message: "Reset Password successfully", redirect: true }
    } catch (error) {
        return { status: false, message: "Something went wrong!" }
    }
}