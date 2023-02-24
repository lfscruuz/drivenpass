import { cryptr } from "@/config/cryptr";
import { credentialsRepository } from "@/repositories/credentials-repository";


async function postCredential(userId: number, credentialData: credentialInput) {

    const existingCredential = await credentialsRepository.findExistingtCredential(userId, credentialData);
    if (existingCredential) {
        throw { name: "CONFLICT", message: "title already in use" }
    }

    credentialData.password = encryptPassword(credentialData)
    const result = await credentialsRepository.createCredential(userId, credentialData);

    return
}

async function getCredentials(userId: number) {
    const result = await credentialsRepository.findAllCredentials(userId);

    console.log(result);

    if (!result || result.length === 0) {
        throw { name: "NOT_FOUND", message: "user has no credentials" }
    }

    const results = result.map((r) => {
        r.password = decryptPassword(r)
        return r
    })

    return results
}

async function getCredentialById(id: number) {
    const result = await credentialsRepository.findFirstCredential(id);

    if (!result) {
        throw { name: "NOT_FOUND", message: "credential doesn't exist or does not belong to user" }
    }

    result.password = decryptPassword(result);

    return result;
}

async function deleteCredentialById(id: number) {
    const existingCredential = await credentialsRepository.findFirstCredential(id);

    if (!existingCredential) {
        throw { name: "NOT_FOUND", message: "credential doesn't exist or does not belong to user" }
    }

    await credentialsRepository.deleteCredential(id)
}

function encryptPassword(credentialData: credentialInput) {
    return cryptr.encrypt(credentialData.password);
}

function decryptPassword(credentialData: credentialInput) {
    return cryptr.decrypt(credentialData.password)
}

export type credentialInput = {
    url: string,
    username: string,
    password: string,
    title: string
}

export const credentialsService = {
    postCredential,
    getCredentials,
    getCredentialById,
    deleteCredentialById
}