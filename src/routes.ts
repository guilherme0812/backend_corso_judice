import { Router } from "express";
import { companiesRouter } from "./modules/companies/companies.routes";
import { clientsRouter } from "./modules/clients/clients.routes";
import { usersRouter } from "./modules/users/users.routes";

const router = Router();

router.use("/", companiesRouter);
router.use("/", clientsRouter);
router.use("/", usersRouter);

export default router;
