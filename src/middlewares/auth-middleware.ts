import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken"

export type authRequest = Request & JWTPayload
type JWTPayload = {
    userId: number
}
export async function authenticateToken(req: authRequest, res: Response, next: NextFunction){
    const {authorization} = req.headers;
    if (!authorization){
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const token = authorization?.split(" ")[1];
    if(!token){
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const {userId} = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.userId = userId
    next()
}
