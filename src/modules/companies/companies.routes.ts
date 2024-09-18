import { Router } from "express";
import { CompaniesController } from "./companies.controller";

const companiesRouter = Router();

const companiesController = new CompaniesController();

companiesRouter.get("/companies", companiesController.findAll);
companiesRouter.get("company", companiesController.findOne);
companiesRouter.post("companies", companiesController.create);

export { companiesRouter };
