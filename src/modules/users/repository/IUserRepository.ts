export enum Role {
  "admin",
  "owner",
  "employee",
}
export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
  companyId: string;
}

export interface UserDataType {
  id: string;
  email: string;
  password: string;
  role: any;
  firstName: string;
  lastName: string;
  createAt: Date;
  updateAt: Date;
  companyId: string;
}

export type LoginBody = {
  email: string;
  password: string;
};

export interface IUserRepository {
  findUserByEmail: (email: string) => Promise<UserDataType | null>;
  create: (body: UserCreate) => Promise<any>;
  update(data: UserCreate): Promise<UserDataType>;
  remove(id: string): Promise<UserDataType>;
}
