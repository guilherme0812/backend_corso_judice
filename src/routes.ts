import { Router } from "express";
import { companiesRouter } from "./modules/companies/companies.routes";
import { clientsRouter } from "./modules/clients/clients.routes";
import { usersRouter } from "./modules/users/users.routes";

const router = Router();

router.use("/private", companiesRouter);
router.use("/private", clientsRouter);
router.use("/private", usersRouter);

export default router;
