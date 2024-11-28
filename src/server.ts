import Fastify from "fastify";
import { companiesRoutes } from "./modules/companies/companies.routes";
import { cors } from "./plugins/cors";
import { prismaPlugin } from "./plugins/prisma";
import { clientsRoutes } from "./modules/clients/clients.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { authMiddleware } from "./middleware/authMiddleware";
// import { authMiddleware } from './plugins/auth';
// import { prismaPlugin } from './plugins/prisma';
// import userRoutes from './modules/user/user.routes';
// import companyRoutes from './modules/company/company.routes';
// import clientRoutes from './modules/client/client.routes';
// import caseRoutes from './modules/case/case.routes';

const app = Fastify();

// Plugins
app.register(prismaPlugin);
console.log("Prisma plugin registered successfully");

app.register(cors);
console.log("CORS plugin registered successfully");
// app.addHook('preHandler', authMiddleware);

app.get("/", async (request, reply) => {
  return { message: "Hello, Vercel!" };
});

// Rotas
app.register(companiesRoutes, {
  prefix: "/api",
});
app.register(clientsRoutes, { prefix: "/api" });
app.register(usersRoutes, { prefix: "/api" });

const startLocalServer = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("app running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

if (process.env.NODE_ENV != "production") {
  startLocalServer();
}

// Exporta para produção
export const serverHandler = async (req: any, res: any) => {
  await app.ready();
  app.server.emit("request", req, res);
};
