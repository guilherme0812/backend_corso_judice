import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
// import { authMiddleware } from './auth/auth.middleware';

const app: Application = express();

// Middlewares globais
app.use(express.json());
app.use(cors());

// Rotas principais
app.use("/api", router);

export default app;
