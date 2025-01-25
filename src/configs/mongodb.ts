// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { env } from "@/env.mjs";
import { MongoClient, ServerApiVersion } from "mongodb"

const DATABASE_URL = env.DATABASE_URL!;

if (!DATABASE_URL) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_URL"')
}

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
}

let client: MongoClient

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    // eslint-disable-next-line prefer-const
    let globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient
    }

    if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(DATABASE_URL, options)
    }
    client = globalWithMongo._mongoClient
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(DATABASE_URL, options)
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client