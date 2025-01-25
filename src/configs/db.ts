import mongoose from "mongoose";
import { env } from "@/env.mjs";
declare global {
    // eslint-disable-next-line no-var
    var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    const DATABASE_URL = env.DATABASE_URL!;

    if (!DATABASE_URL) {
        throw new Error(
            "Please define the DATABASE_URL environment variable inside .env.local",
        );
    }

    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;