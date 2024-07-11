import { Router } from "express";
import { CompanyController } from "./company.controller";

const companyRouter = Router();

const companyController = new CompanyController();

companyRouter.get("/", companyController.findAll);

export { companyRouter };
