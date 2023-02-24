import { DBconnection } from "@/config/database";

async function createUser(email: string, password: string){
    return DBconnection.user.create({
        data: {
            email,
            password
        }
    })
}

async function findUserByEmail(email: string){
    return DBconnection.user.findFirst({
        where:{
            email
        }
    })
}


export const userReposiory = {
    createUser,
    findUserByEmail
}