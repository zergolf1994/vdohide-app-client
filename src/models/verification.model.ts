import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";


export interface IVerificationCode extends Document {
    userId: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

const verificationCodeSchema = new Schema<IVerificationCode>(
    {
        _id: { type: String, default: () => uuidv4() },
        userId: { type: String, ref: "User", index: true, required: true },
        type: { type: String, required: true, },
    }
);

const VerificationCodeModel = mongoose?.models?.VerificationCode || mongoose.model<IVerificationCode>("VerificationCode", verificationCodeSchema);
export default VerificationCodeModel;