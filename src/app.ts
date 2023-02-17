import express, {Express} from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/database";

const app = express();

app.use(cors());
app.use(express.json());

export function init(): Promise<Express>{
    connectDB()
    return Promise.resolve(app)
}

export async function close(): Promise<void>{
    await disconnectDB();
}

export default app