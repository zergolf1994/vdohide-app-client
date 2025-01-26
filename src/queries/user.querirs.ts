"use server"

import dbConnect from "@/configs/db";
import SessionModel from "@/models/session.model";
import UserModel, { UserDocument } from "@/models/user.model";
import { loginSchemaType } from "@/validators/auth.validator";
import { headers } from "next/headers";
import { userAgent } from "next/server";

export const getUserById = async (id: string) => {
    await dbConnect()
    return await UserModel.findById(id).lean();
}

export const loginWithCredentials = async (values: loginSchemaType) => {
    const { email, password } = values

    const { ua: user_agent } = userAgent({ headers: await headers() })

    await dbConnect()
    const user = await UserModel.findOne({ email });
    if (!user || !user.password) return null

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return null

    const session = await SessionModel.create({ userId: user._id, user_agent });
    return { ...user._doc, sessionId: session?._id };
}

export const getSessionById = async (id: string) => {
    await dbConnect()
    return await SessionModel.findById(id).lean();
}