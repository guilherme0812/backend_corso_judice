import { Router } from "express";
import { companiesRouter } from "./modules/companies/companies.routes";
// import authRoutes from './modules/auth/auth.routes';
// import companyRoutes from './modules/companies/companies.routes';

const router = Router();

// router.use('/auth', authRoutes);

router.use("/", companiesRouter);

// Adicione as rotas para outros módulos aqui

export default router;
