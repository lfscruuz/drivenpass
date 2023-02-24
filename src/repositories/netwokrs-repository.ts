import { DBconnection } from "@/config/database";
import { NetworkInput } from "@/services/networks-service";

async function createNetwork(userId: number, networkData: NetworkInput) {

    const { network, password, title } = networkData;

    return DBconnection.network.create({
        data: {
            network,
            password,
            title,
            userId
        },
    })
}

async function findExistingtNetwork(userId: number, networkData: NetworkInput) {

    const { title } = networkData;

    return DBconnection.network.findFirst({
        where: {
            userId,
            title
        }
    })
}

async function findAllNetworks(userId: number) {
    return DBconnection.network.findMany({
        where: {
            userId
        }
    })
}

async function findFirstNetwork(id: number) {
    return DBconnection.network.findFirst({
        where: {
            id
        }
    })
}

async function deleteNetwork(id: number){
    return DBconnection.network.delete({
        where: {
            id
        }
    })
}

export const networksRepository = {
    createNetwork,
    findExistingtNetwork,
    findAllNetworks,
    findFirstNetwork,
    deleteNetwork
}