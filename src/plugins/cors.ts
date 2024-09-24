import fastifyCors from "@fastify/cors";
import fp from "fastify-plugin";

// Plugin para configurar CORS no Fastify
export const cors = fp(async (server) => {
	// Registra o plugin de CORS no servidor Fastify
	await server.register(fastifyCors, {
		// Permite solicitações de qualquer origem
		origin: true,
		// Permite os métodos HTTP especificados
		methods: ["GET", "POST", "PUT", "DELETE"],
		// Permite o envio de cookies e credenciais com as solicitações
		credentials: true,
	});
});
