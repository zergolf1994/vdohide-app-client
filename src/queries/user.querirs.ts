"use server"

import dbConnect from "@/configs/db";
import SessionModel from "@/models/session.model";
import UserModel, { UserDocument } from "@/models/user.model";

export const getUserById = async (id: string) => {
    await dbConnect()
    return await UserModel.findById(id).lean();
}

export const getSessionById = async (id: string) => {
    await dbConnect()
    return await SessionModel.findById(id).lean();
}