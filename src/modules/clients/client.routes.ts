import { Router } from "express";
import { ClientsController } from "./clients.controller";

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get("/clients", clientsController.findAll);
clientsRouter.get("/client", clientsController.findOne);
clientsRouter.post("/client", clientsController.create);
clientsRouter.put("/client", clientsController.update);
clientsRouter.delete("/client", clientsController.remove);

export { clientsRouter };
