import { authRequest } from "@/middlewares";
import { credentialsService } from "@/services/credentials-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCredential(req: authRequest, res: Response) {
    const userId = req.userId;
    const credentialData = req.body;

    try {
        await credentialsService.postCredential(userId, credentialData)
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.CONFLICT).send(error)
    }
}

export async function getAllCredentials(req: authRequest, res: Response){
    const userId = req.userId;

    try {
        const result = await credentialsService.getCredentials(userId);
        res.status(httpStatus.OK).send(result)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}

export async function getCredentialById(req: authRequest, res: Response) {
    const {id} = req.params;

    try {
        const result = await credentialsService.getCredentialById(Number(id));
        res.status(httpStatus.OK).send(result)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}

export async function deleteCredentialById(req: authRequest, res: Response){
    const {id} = req.params;

    try {
        await credentialsService.deleteCredentialById(Number(id));
        res.sendStatus(httpStatus.ACCEPTED)
    } catch (error) {
        console.log(error);
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}