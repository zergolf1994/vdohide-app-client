import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface UserPreferences {
    enable2FA: boolean;
    emailNotification: boolean;
    twoFactorSecret?: string;
}

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    userPreferences: UserPreferences;
    //comparePassword(value: string): Promise<boolean>;
}

const userPreferencesSchema = new Schema<UserPreferences>(
    {
        enable2FA: { type: Boolean, default: false },
        emailNotification: { type: Boolean, default: true },
        twoFactorSecret: { type: String, required: false },
    },
    { _id: false }
);

const userSchema = new Schema<UserDocument>(
    {
        _id: { type: String, default: () => uuidv4() },
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String },
        isEmailVerified: { type: Boolean, default: false },
        userPreferences: { type: userPreferencesSchema, default: {} },
        image: { type: String },
    },
    {
        timestamps: true,
        toJSON: {},
    }
);

// userSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await hashValue(this.password);
//     }
//     next();
// });

// userSchema.methods.comparePassword = async function (value: string) {
//     return compareValue(value, this.password);
// };

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.userPreferences.twoFactorSecret;
        return ret;
    },
});

const UserModel = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
export default UserModel;