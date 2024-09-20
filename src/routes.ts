import { Router } from "express";
import { companiesRouter } from "./modules/companies/companies.routes";
import { clientsRouter } from "./modules/clients/client.routes";
// import authRoutes from './modules/auth/auth.routes';
// import companyRoutes from './modules/companies/companies.routes';

const router = Router();

// router.use('/auth', authRoutes);

router.use("/", companiesRouter);
router.use("/", clientsRouter);

// Adicione as rotas para outros módulos aqui

export default router;
