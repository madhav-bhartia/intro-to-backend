import dotenv from "dotenv";
import fs from "fs";
import connectDB from "./config/database.js";
import app from "./app.js";

// Load environment variables from .env or atlas-credentials.env
const envFiles = [
    "atlas-credentials.env",
    ".env",
    "backend/atlas-credentials.env",
    "backend/.env"
];

for (const file of envFiles) {
    if (fs.existsSync(file)) {
        dotenv.config({ path: file });
        break;
    }
}
// Fallback default dotenv load
dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.error("Express server error:", error);
            throw error;
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();