import jwt from "jsonwebtoken";
import { FastifyRequest, FastifyReply } from "fastify";

export async function authMiddleware(
  req: FastifyRequest, // Permite qualquer rota genérica
  res: FastifyReply
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Authentication failed!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded; // Injetando dados do usuário no request
  } catch (err) {
    return res.status(401).send({ message: "Invalid token!" });
  }
}
