import { DBconnection } from "@/config/database"
import jwt from "jsonwebtoken"

export default async function clearDb(){
    await DBconnection.credential.deleteMany({})
    await DBconnection.network.deleteMany({})
    await DBconnection.user.deleteMany({})
}

export async function createValidToken(userId: number) {
    return jwt.sign({ userId }, process.env.JWT_SECRET)
}