import { authRequest } from "@/middlewares";
import { networksService } from "@/services/networks-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postNetwork(req: authRequest, res: Response) {
    const userId = req.userId;
    const networkData = req.body;

    try {
        await networksService.postNetwork(userId, networkData)
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.CONFLICT).send(error)
    }
}

export async function getAllNetworks(req: authRequest, res: Response){
    const userId = req.userId;

    try {
        const result = await networksService.getNetworks(userId);
        res.status(httpStatus.OK).send(result)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}

export async function getNetworkById(req: authRequest, res: Response) {
    const {id} = req.params;

    try {
        const result = await networksService.getNetworkById(Number(id));
        res.status(httpStatus.OK).send(result)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}

export async function deleteNetworkById(req: authRequest, res: Response){
    const {id} = req.params;

    try {
        await networksService.deleteNetworkById(Number(id));
        res.sendStatus(httpStatus.ACCEPTED)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}