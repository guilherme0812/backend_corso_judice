import Fastify from "fastify";
import cors from "@fastify/cors";
import { companiesRoutes } from "./modules/companies/companies.routes";
// import { authMiddleware } from './plugins/auth';
// import { prismaPlugin } from './plugins/prisma';
// import userRoutes from './modules/user/user.routes';
// import companyRoutes from './modules/company/company.routes';
// import clientRoutes from './modules/client/client.routes';
// import caseRoutes from './modules/case/case.routes';

const app = Fastify();

// Configurar CORS
app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// Plugins
// app.register(prismaPlugin);
// app.addHook('preHandler', authMiddleware);

// Rotas
// app.register(userRoutes, { prefix: '/users' });
// app.register(companyRoutes, { prefix: '/companies' });
// app.register(clientRoutes, { prefix: '/clients' });
// app.register(caseRoutes, { prefix: '/cases' });
app.register(companiesRoutes);

app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});
const start = async () => {
  try {
    await app.listen({ port: 3001 });
    console.log("app running on http://localhost:3001");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
