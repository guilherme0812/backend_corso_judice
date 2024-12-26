import { FastifyRequest } from "fastify";
import { UserDataType } from "../modules/users/repository/IUserRepository";

export type CustomFastifyRequest = FastifyRequest & {
  user: UserDataType;
};
