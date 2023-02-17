import { DBconnection } from "@/config/database";
import { faker } from "@faker-js/faker";

export function createCredentailFromUser(userId: number) {
    return DBconnection.credential.create({
        data: {
            title: faker.company.name(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            userId
        }
    })
}