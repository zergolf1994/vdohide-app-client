import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";


export interface SessionDocument extends Document {
    userId: string;
    sessionToken: string;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
}


const sessionSchema = new Schema<SessionDocument>(
    {
        _id: { type: String, default: () => uuidv4() },
        userId: { type: String, required: true },
        sessionToken: { type: String },
        expires: { type: Date },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

sessionSchema.set("toJSON", {
    transform: function (doc, ret) {
        // delete ret.password;
        // delete ret.userPreferences.twoFactorSecret;
        return ret;
    },
});

const SessionModel = mongoose.models.Session || mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel;