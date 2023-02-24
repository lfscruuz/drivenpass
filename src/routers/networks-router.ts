import { deleteNetworkById, getAllNetworks, getNetworkById, postNetwork } from "@/controllers";
import { authenticateToken, networksValidation } from "@/middlewares";
import { Router } from "express";

const networksRouter = Router();

networksRouter
.post("/", authenticateToken, networksValidation, postNetwork)
.get("/", authenticateToken, getAllNetworks)
.get("/:id", authenticateToken, getNetworkById)
.delete("/:id", authenticateToken, deleteNetworkById)

export {networksRouter}