import express from "express";
import { companyRouter } from "./module/company/route";

const app = express();

app.use(express.json());

app.use("/", companyRouter);

app.listen(3000, () => console.log("Servidor está rodando"));
