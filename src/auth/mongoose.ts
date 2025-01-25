import mongoose, { Mongoose } from "mongoose";
import type {
    Adapter,
    AdapterSession,
    VerificationToken as AdapterVerificationToken,
} from "next-auth/adapters";
import UserModel from "@/models/user.models";
import AccountModel from "@/models/account.models";
import SessionModel from "@/models/session.models";
import VerificationTokenModel from "@/models/verification-token.models";

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
            //console.log("getUser: ", id);
            await dbConnect;
            const user = await UserModel.findById(id);
            //console.log("getUser user: ", user);
            return user;
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
            //console.log("linkAccount: ", data);

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
            //console.log("createSession: ", data);

            await dbConnect;
            const session = await SessionModel.create(data);
            return session;
        },
        async getSessionAndUser(sessionToken) {
            //console.log("getSessionAndUser: ", sessionToken);
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
            //console.log("updateSession: ", data);
            const { id, ...restData } = data as AdapterSession & { id: string };
            await dbConnect;
            const session = await SessionModel.findByIdAndUpdate(id, restData, {
                new: true,
                runValidators: true,
            });
            return session;
        },
        async deleteSession(sessionToken) {
            //console.log("deleteSession: ", sessionToken);
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