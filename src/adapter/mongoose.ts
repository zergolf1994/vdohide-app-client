import mongoose, { Mongoose } from "mongoose";
import type {
    Adapter,
    AdapterSession,
    VerificationToken as AdapterVerificationToken,
} from "next-auth/adapters";
import UserModel from "@/models/user.model";
import AccountModel from "@/models/account.model";
import SessionModel from "@/models/session.model";
import VerificationTokenModel from "@/models/verification-token.model";
import { headers } from "next/headers";
import { userAgent } from "next/server";

export const format = {
    /** Takes a MongoDB object and returns a plain old JavaScript object */
    from<T = Record<string, unknown>>(object: Record<string, any>): T {
        const newObject: Record<string, unknown> = {};
        for (const key in object) {
            const value = object[key];
            if (key === "_id") {
                newObject.id = value.toHexString();
            } else if (key === "userId") {
                newObject[key] = value.toHexString();
            } else {
                newObject[key] = value;
            }
        }
        return newObject as T;
    },
};

const MongooseAdapter = (
    dbConnect: Promise<Mongoose>
): Adapter => {

    // Methods
    const adaptorMethods: Adapter = {

        async createUser(data) {
            //console.log("createUser: ", data);
            await dbConnect;
            const user = await UserModel.create(data);
            return user;
        },

        async getUser(id) {
            const { ua: user_agent } = userAgent({ headers: await headers() })
            // console.log("getUser: ", id);
            await dbConnect;
            const user = await UserModel.findById(id);
            const session = await SessionModel.create({ userId: user?._id, user_agent });
            // console.log("getUser user: ", user);
            return { ...user._doc, sessionId: session?._id };
        },

        async getUserByEmail(email) {
            //console.log("getUserByEmail: ", email);
            await dbConnect;
            const user = await UserModel.findOne({ email });
            return user;
        },
        async getUserByAccount(data) {
            //console.log("getUserByAccount: ", data);
            const { providerAccountId, provider } = data;
            await dbConnect;

            // Get Account
            const account = await AccountModel.findOne({ providerAccountId, provider });
            if (!account) return null;

            // Find User
            if (adaptorMethods.getUser) {
                const user = await adaptorMethods.getUser(account.userId);
                return user;
            }
            return null;
        },

        async updateUser(data) {
            //console.log("updateUser: ", data);
            const { id, ...restData } = data;
            await dbConnect;
            const user = await UserModel.findByIdAndUpdate(id, restData, {
                new: true,
                runValidators: true,
            });
            return user;
        },
        async deleteUser(userId) {
            //console.log("deleteUser: ", userId);
            await dbConnect;
            const user = await UserModel.findByIdAndDelete(userId);
            return user;
        },
        async linkAccount(data) {
            // console.log("linkAccount: ", data);
            await dbConnect;
            const account = await AccountModel.create(data);
            return account;
        },
        async unlinkAccount(data) {
            //console.log("unlinkAccount: ", data);
            const { providerAccountId, provider } = data;
            await dbConnect;
            const account = await AccountModel.findOneAndDelete({
                providerAccountId,
                provider,
            });

            if (account) return account;
        },
        async createSession(data) {
            console.log("createSession: ", data);
            await dbConnect;
            const session = await SessionModel.create(data);
            return session;
        },
        async getSessionAndUser(sessionToken) {
            console.log("getSessionAndUser: ", sessionToken);
            await dbConnect;

            // Get Session
            const session = await SessionModel.findOne({ sessionToken });
            if (!session) return null;

            // Find User
            if (adaptorMethods.getUser) {
                const user = await adaptorMethods.getUser(session.userId);
                if (!user) return null;

                return { user, session };
            }
            return null;
        },
        async updateSession(data) {
            console.log("updateSession: ", data);
            const { id, ...restData } = data as AdapterSession & { id: string };
            await dbConnect;
            const session = await SessionModel.findByIdAndUpdate(id, restData, {
                new: true,
                runValidators: true,
            });
            return session;
        },
        async deleteSession(sessionToken) {
            console.log("deleteSession: ", sessionToken);
            await dbConnect;
            const session = await SessionModel.findOneAndDelete({ sessionToken });
            return session;
        },
        // These methods are required to support email / passwordless sign in:
        async createVerificationToken(data) {
            //console.log("createVerificationToken: ", data);
            await dbConnect;
            const verificationToken = await VerificationTokenModel.create(data);
            return verificationToken;
        },
        async useVerificationToken(data) {
            //console.log("useVerificationToken: ", data);
            const { identifier, token } = data;
            await dbConnect;
            const verificationToken = await VerificationTokenModel.findOne({
                identifier,
                token,
            });
            return verificationToken;
        },
    }

    return adaptorMethods;
}
export default MongooseAdapter;