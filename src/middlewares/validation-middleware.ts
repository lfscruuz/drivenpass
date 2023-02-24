import { credentialsSchema } from "@/schemas/credential-schemas";
import { networksSchema } from "@/schemas/networks-schemas";
import { signUpSchema } from "@/schemas/user-schemas";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function signInValidation(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const { error } = signUpSchema.validate(body, { abortEarly: false });

    if (!error) {
        return next()
    }

    const errors = error?.details.map((e) => {
        return e.message
    })

    return res.status(httpStatus.BAD_REQUEST).send(errors)
}

export async function credentialsValidation(req: Request, res: Response, next: NextFunction){
    const {body} = req;
    const {error} = credentialsSchema.validate(body, {abortEarly: true});

    if (!error) return next();

    const errors = error.details.map((e) =>{
        return e.message
    })
    return res.status(httpStatus.BAD_REQUEST).send(errors)
}

export async function networksValidation(req: Request, res: Response, next: NextFunction){
    const {body} = req;
    const {error} = networksSchema.validate(body, {abortEarly: true});

    if (!error) return next();

    const errors = error.details.map((e) =>{
        return e.message
    })
    return res.status(httpStatus.BAD_REQUEST).send(errors)
}