import { DBconnection } from "@/config/database";
import {faker} from "@faker-js/faker";

export function createNetworkFromUser(userId: number){
    DBconnection.network.create({
        data:{
            title: faker.company.name(),
            network: faker.name.fullName(),
            password: faker.internet.password(),
            userId
        }
    })
}