import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  IUserRepository,
  LoginBody,
  UserCreate,
} from "./repository/IUserRepository";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register({ password, ...body }: UserCreate) {
    const existUser = await this.userRepository.findUserByEmail(body.email);

    if (existUser) {
      throw { status: 400, message: "Email já em uso" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...body,
      password: hashedPassword,
    });

    if (!user) {
      throw { status: 404, message: "failed" };
    }

    return { message: "Cadastro de usuário realizado com sucesso!" };
  }

  async login(body: LoginBody) {
    const user = await this.userRepository.findUserByEmail(body.email);

    if (!user) {
      throw { status: 401, message: "Dados inválidos" };
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw { status: 401, message: "Dados inválidos" };
    }

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { token, ...user };
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async update(body: UserCreate) {
    return this.userRepository.update(body);
  }

  async remove(id: string) {
    const existUser = await this.userRepository.findOne(id);

    if (!existUser) {
      throw { status: 404, message: "Usuário não encontrado" };
    }

    const exclude = await this.userRepository.remove(id);

    if (!exclude) {
      throw { status: 400, message: "Erro ao excluir usuário" };
    }

    return { message: "Exclusão de usuário realizado com sucesso!" };
  }
}
