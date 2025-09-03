import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const FRONTEND_URI = "http://localhost:3000";

export const GATEWAY_PORT = 4000;
export const AUTH_PORT = 4001;
export const BUSINESS_PORT = 4002;
export const COMMENT_PORT = 4003;
export const EVENT_PORT = 4004;
export const RESIDENT_PORT = 4005;
export const AI_PORT = 4006;

export const SECRET_KEY = process.env.JWT_SECRET || "jwt-secret-key";
export const MONGO_URI = process.env.MONGO_URI

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "your-gemini-api-key";
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-gemini-2.0-flash-lite";
