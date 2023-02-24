import { DBconnection } from "@/config/database";
import { credentialInput } from "@/services/credentials-service";

async function createCredential(userId: number, credentialData: credentialInput) {

    const { url, username, password, title } = credentialData;

    return DBconnection.credential.create({
        data: {
            url,
            username,
            password,
            title,
            userId
        },
    })
}

async function findExistingtCredential(userId: number, credentialData: credentialInput) {

    const { title } = credentialData;

    return DBconnection.credential.findFirst({
        where: {
            userId,
            title
        }
    })
}

async function findAllCredentials(userId: number) {
    return DBconnection.credential.findMany({
        where: {
            userId
        }
    })
}

async function findFirstCredential(id: number) {
    return DBconnection.credential.findFirst({
        where: {
            id
        }
    })
}

async function deleteCredential(id: number){
    return DBconnection.credential.delete({
        where: {
            id
        }
    })
}

export const credentialsRepository = {
    createCredential,
    findExistingtCredential,
    findAllCredentials,
    findFirstCredential,
    deleteCredential
}