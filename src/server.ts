import dotenv from "dotenv";
import Fastify from 'fastify';
import { companiesRoutes } from './modules/companies/companies.routes';
import { cors } from './plugins/cors';
import { prismaPlugin } from './plugins/prisma';
import { clientsRoutes } from './modules/clients/clients.routes';
import { usersRoutes } from './modules/users/users.routes';
import { casesRoutes } from './modules/cases/cases.routes';

import multipart from '@fastify/multipart';
import '@fastify/multipart';

import { documentsRoutes } from './modules/documents/document.route';
import { attorneysRoutes } from './modules/Attorneys/attorneys.route';
import { graphsRoutes } from './modules/graphs/graphs.route';
import { customDocumentMappingRoutes } from './modules/CustomDocumentMapping/customDocumentMapping.route';
import { financesRoutes } from "./modules/finances/finances.route";
import { financialEntryRoutes } from "./modules/financial/entry/entrey.route";
import { paymentRoutes } from "./modules/financial/payment/payment.routes";

dotenv.config();

const app = Fastify();

const start = async () => {

    // Plugins
    await app.register(prismaPlugin);

    console.log('Prisma plugin registered successfully');

    await app.register(cors);
    console.log('CORS plugin registered successfully');
    // app.addHook('preHandler', authMiddleware);

    app.register(multipart);

    // Rotas
    app.register(companiesRoutes, {
        prefix: '/api',
    });
    app.register(clientsRoutes, { prefix: '/api' });
    app.register(usersRoutes, { prefix: '/api' });
    app.register(casesRoutes, { prefix: '/api' });
    // app.register(tasksRoutes, { prefix: '/api' });
    app.register(documentsRoutes, { prefix: '/api' });
    app.register(attorneysRoutes, { prefix: '/api' });
    app.register(graphsRoutes, { prefix: '/api' });
    app.register(customDocumentMappingRoutes, { prefix: '/api' });
    // app.register(financesRoutes, { prefix: '/api' });
    app.register(financialEntryRoutes, { prefix: '/api' });
    app.register(paymentRoutes, { prefix: '/api' });

    try {
        await app.listen({
            port: Number(process.env.PORT) || 3000,
            host: '0.0.0.0',
        });
        console.log(`app running on http://localhost:${process.env.PORT}`);
        //
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();

export default start;
