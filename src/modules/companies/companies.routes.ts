import { Router } from "express";
import { CompaniesController } from "./companies.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const companiesRouter = Router();

const companiesController = new CompaniesController();

companiesRouter.get("/companies", companiesController.findAll);
companiesRouter.get("/company", companiesController.findOne);
companiesRouter.post("/company", companiesController.create);
companiesRouter.put("/company", companiesController.update);
companiesRouter.delete("/company", companiesController.remove);

export { companiesRouter };
