import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";


export interface VerificationTokenDocument extends Document {
    identifier: string;
    token: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
}


const verificationTokenSchema = new Schema<VerificationTokenDocument>(
    {
        _id: { type: String, default: () => uuidv4() },
        identifier: { type: String, required: true },
        token: { type: String },
        expires: { type: Date },
    }
);

const VerificationTokenModel = mongoose?.models?.VerificationToken || mongoose.model<VerificationTokenDocument>("VerificationToken", verificationTokenSchema);
export default VerificationTokenModel;