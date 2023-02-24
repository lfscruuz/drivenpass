import express, {Express} from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/database";
import { credentialsRouter, networksRouter, userRouter } from "./routers";
import { loadEnv } from "./config/loadEnvs";

const app = express();

loadEnv();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter)
app.use("/credentials", credentialsRouter)
app.use("/networks", networksRouter)

export function init(): Promise<Express>{
    connectDB()
    return Promise.resolve(app)
}

export async function close(): Promise<void>{
    await disconnectDB();
}

export default app