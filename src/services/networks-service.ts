import { cryptr } from "@/config/cryptr";
import { networksRepository } from "@/repositories/netwokrs-repository";


async function postNetwork(userId: number, networkData: NetworkInput) {

    const existingNetwork = await networksRepository.findExistingtNetwork(userId, networkData);
    if (existingNetwork) {
        throw { name: "CONFLICT", message: "title already in use" }
    }

    networkData.password = encryptPassword(networkData)
    const result = await networksRepository.createNetwork(userId, networkData);

    return
}

async function getNetworks(userId: number) {
    const result = await networksRepository.findAllNetworks(userId);

    console.log(result);

    if (!result) {
        throw { name: "NOT_FOUND", message: "user has no networks" }
    }

    const results = result.map((r) => {
        r.password = decryptPassword(r)
        return r
    })


    return results
}

async function getNetworkById(id: number) {
    const result = await networksRepository.findFirstNetwork(id);

    if (!result) {
        throw { name: "NOT_FOUND", message: "Network doesn't exist or does not belong to user" }
    }

    result.password = decryptPassword(result);

    return result;
}

async function deleteNetworkById(id: number) {
    const existingNetwork = await networksRepository.findFirstNetwork(id);

    if (!existingNetwork) {
        throw { name: "NOT_FOUND", message: "Network doesn't exist or does not belong to user" }
    }

    await networksRepository.deleteNetwork(id)
}

function encryptPassword(networkData: NetworkInput) {
    return cryptr.encrypt(networkData.password);
}

function decryptPassword(networkData: NetworkInput) {
    return cryptr.decrypt(networkData.password)
}

export type NetworkInput = {
    network: string,
    password: string,
    title: string
}

export const networksService = {
    postNetwork,
    getNetworks,
    getNetworkById,
    deleteNetworkById
}