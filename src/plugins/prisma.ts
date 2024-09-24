import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

// Cria uma instância do PrismaClient
const prisma = new PrismaClient();

// Estende a interface FastifyInstance para incluir PrismaClient
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin = fp(async (server) => {
  // Adiciona prisma à instância do servidor
  server.decorate("prisma", prisma);
  // Desconecta o PrismaClient ao fechar o servidor
  server.addHook("onClose", async (server) => {
    await server.prisma.$disconnect();
  });
});

export { prisma };
