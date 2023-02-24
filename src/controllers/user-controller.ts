import { userService } from "@/services/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singup(req: Request, res: Response){
    const {email, password} = req.body;

    try {
        const user = await userService.createUser(email, password);
        return res.status(httpStatus.CREATED).send(user)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.CONFLICT)
    }
}

export async function login(req: Request, res: Response){
    const {email, password} = req.body;

    try {
        const user = await userService.getUser(email, password);
        return res.status(httpStatus.OK).send(user);
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}
