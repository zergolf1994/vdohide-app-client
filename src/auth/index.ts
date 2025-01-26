import NextAuth, { CredentialsSignin } from 'next-auth';
import { authConfig } from '@/auth/config';
import { v4 as uuidv4 } from "uuid";

import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import dbConnect from '@/configs/db';
import MongooseAdapter from '@/adapter/mongoose';
import { loginSchema } from '@/validators/auth.validator';
import { loginWithCredentials } from '@/queries/user.querirs';
import { ExtendedUser } from '@/types/next-auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
    // debug: true,
    adapter: MongooseAdapter(dbConnect()),
    session: {
        strategy: "jwt",
        generateSessionToken: () => { return uuidv4() },
        updateAge: 3600,
        maxAge: 3600
    },
    ...authConfig,
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true
        }),
        //GitHub,
        Credentials({
            async authorize(credentials, req) {
                const validator = loginSchema.safeParse(credentials);
                if (!validator.success) return null

                const user = await loginWithCredentials(validator.data)
                if (!user) return null
                return user as ExtendedUser
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url
            else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
            return baseUrl
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.role = user.role;
                token.sessionId = user.sessionId;
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;
                session.user.sessionId = token.sessionId;
                session.user.email = token.email as string;
                session.user.role = token.role;
                session.user.name = token.name;
                session.user.image = token.picture;
            }
            return session;
        },
    },
});