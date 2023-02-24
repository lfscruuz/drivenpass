import { cryptr } from "@/config/cryptr";
import { DBconnection } from "@/config/database";
import { faker } from "@faker-js/faker";

export function createCredentailFromUserId(userId: number) {
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

export function createCredentialWithEncryptedPassword(userId: number){
    const password = faker.internet.password();
    const hashedPassword = cryptr.encrypt(password)
    return DBconnection.credential.create({
        data: {
            title: faker.company.name(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: hashedPassword,
            userId
        }
    })
}