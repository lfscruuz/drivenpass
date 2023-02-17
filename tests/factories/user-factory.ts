import { DBconnection } from "@/config/database";
import {faker} from "@faker-js/faker"

export function createUser(){
    return DBconnection.user.create({
        data:{
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    })
}