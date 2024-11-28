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

const start = async () => {
  // Plugins
  await app.register(prismaPlugin);
  console.log("Prisma plugin registered successfully");

  await app.register(cors);
  console.log("CORS plugin registered successfully");
  // app.addHook('preHandler', authMiddleware);

  // Rotas
  app.register(companiesRoutes, {
    prefix: "/api",
  });
  app.register(clientsRoutes, { prefix: "/api" });
  app.register(usersRoutes, { prefix: "/api" });

  try {
    await app.listen({ port: 3000 });
    console.log("app running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default start;
