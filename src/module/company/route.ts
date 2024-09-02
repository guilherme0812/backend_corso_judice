import { Router } from "express";
import { CompanyController } from "./company.controller";

const companyRouter = Router();

const companyController = new CompanyController();

companyRouter.get("/companies", companyController.findAll);
companyRouter.get("/company", companyController.findOne);
companyRouter.post("/companies", companyController.create);

export { companyRouter };
