import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in the environment variables");
        }

        const connectionString = uri.endsWith("/")
            ? `${uri}${DB_NAME}`
            : uri.includes("?")
                ? uri.replace("?", `/${DB_NAME}?`)
                : `${uri}/${DB_NAME}`;

        const connectionInstance = await mongoose.connect(connectionString);
        console.log(`\nMongoDB connected successfully! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
