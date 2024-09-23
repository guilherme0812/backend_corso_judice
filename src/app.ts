import express, { Application } from "express";
import cors from "cors";
import router from "./routes";
import { authMiddleware } from "./middleware/authMiddleware";
import { authRouter } from "./modules/users/users.routes";
// import { authMiddleware } from './auth/auth.middleware';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", authMiddleware, router);
app.use("/", authRouter);

export default app;
