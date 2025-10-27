import Fastify from 'fastify';
import { companiesRoutes } from './modules/companies/companies.routes';
import { cors } from './plugins/cors';
import { prismaPlugin } from './plugins/prisma';
import { clientsRoutes } from './modules/clients/clients.routes';
import { usersRoutes } from './modules/users/users.routes';
import { casesRoutes } from './modules/cases/cases.routes';
import { tasksRoutes } from './modules/tasks/tasks.routes';

import multipart from '@fastify/multipart';
import '@fastify/multipart';

import * as dotenv from 'dotenv';
import { documentsRoutes } from './modules/documents/document.route';
import { attorneysRoutes } from './modules/Attorneys/attorneys.route';

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
    app.register(tasksRoutes, { prefix: '/api' });
    app.register(documentsRoutes, { prefix: '/api' });
    app.register(attorneysRoutes, { prefix: '/api' });

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
