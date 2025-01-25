import NextAuth from 'next-auth';
import { authConfig } from '@/auth/config';

import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import dbConnect from '@/configs/db';
// import client from '@/configs/mongodb';
import MongooseAdapter from './mongoose';

export const { handlers, auth, signIn, signOut } = NextAuth({
    //adapter: MongoDBAdapter(client),
    adapter: MongooseAdapter(dbConnect()),
    session: { strategy: "jwt" },
    ...authConfig,
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        //GitHub,
        Credentials({}),
    ],
    callbacks: {
        async signIn({ user, account }) {
            //console.log("signIn", { user, account })
            //await UserModel.findOne({})
            if (!account) return false
            return true
            //return await loginOrCreateAccountService({ user, account }) as boolean
        },
        async session({ token, session }) {
            console.log("session", session)
            return session;
        },
        async jwt({ token, trigger, session }) {
            console.log("token", token)
            return token;
        },
    },
});