import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";


export interface AccountDocument extends Document {
    userId: string;
    type: string;
    providerAccountId: string;
    provider: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    createdAt: Date;
    updatedAt: Date;
}


const accountSchema = new Schema<AccountDocument>(
    {
        _id: { type: String, default: () => uuidv4() },
        type: { type: String, required: true },
        providerAccountId: { type: String, unique: true, required: true },
        provider: { type: String, required: true },
        userId: { type: String, required: true },
        refresh_token: { type: String },
        access_token: { type: String },
        expires_at: { type: Number },
        token_type: { type: String },
        scope: { type: String },
        id_token: { type: String },
        session_state: { type: String },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

accountSchema.set("toJSON", {
    transform: function (doc, ret) {
        // delete ret.password;
        // delete ret.userPreferences.twoFactorSecret;
        return ret;
    },
});

const AccountModel = mongoose?.models?.Account || mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;