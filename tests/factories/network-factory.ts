import { cryptr } from "@/config/cryptr";
import { DBconnection } from "@/config/database";
import {faker} from "@faker-js/faker";

export function createNetworkFromUserId(userId: number){
    return DBconnection.network.create({
        data:{
            title: faker.company.name(),
            network: faker.name.fullName(),
            password: faker.internet.password(),
            userId
        }
    })
}

export function createNetworkWithEncryptedPassword(userId: number){
    const password = faker.internet.password();
    const hashedPassword = cryptr.encrypt(password)

    return DBconnection.network.create({
        data:{
            title: faker.company.name(),
            network: faker.name.fullName(),
            password: hashedPassword,
            userId
        }
    })
}