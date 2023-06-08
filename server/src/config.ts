import dotenv from "dotenv";

dotenv.config();

export const mongoDBUri = process.env.DB_MONGO || "not found";
export const port = process.env.PORT;
