import { DBconnection } from "@/config/database";
import {faker} from "@faker-js/faker"

export async function createUser(){
    return DBconnection.user.create({
        data:{
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    })
}

export function createUserWithData(email: string, password: string){
    return  DBconnection.user.create({
        data:{
            email,
            password
        }
    })
}