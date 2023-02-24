import { deleteCredentialById, getAllCredentials, getCredentialById, postCredential } from "@/controllers";
import { authenticateToken, credentialsValidation } from "@/middlewares";
import { Router } from "express";


const credentialsRouter = Router();

credentialsRouter
    .post("/", authenticateToken, credentialsValidation, postCredential)
    .get("/", authenticateToken, getAllCredentials)
    .get("/:id", authenticateToken, getCredentialById)
    .delete("/:id", authenticateToken, deleteCredentialById)

export { credentialsRouter }