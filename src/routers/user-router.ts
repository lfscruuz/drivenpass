import { login, singup } from "@/controllers";
import { signInValidation } from "@/middlewares/";
import { Router } from "express";

const userRouter = Router();

userRouter
.post("/signup", signInValidation, singup)
.post("/login", login);
export {userRouter}