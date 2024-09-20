import { Router } from "express";
import { ClientsController } from "./clients.controller";

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get("/clientes", clientsController.findAll);

export { clientsRouter };
