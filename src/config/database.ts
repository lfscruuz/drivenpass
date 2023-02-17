import { PrismaClient } from "@prisma/client";

export let DBconnection: PrismaClient;

export function connectDB(){
    DBconnection = new PrismaClient();
}

export async function disconnectDB(): Promise<void>{
    await DBconnection?.$disconnect();
}