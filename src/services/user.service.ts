import { userRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

class UserController {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getOne(userId: string): Promise<IUser> {
    return await userRepository.getOne(userId);
  }

  public async create(user: IUser): Promise<IUser> {
    return await userRepository.create(user);
  }

  public async createMany(users: IUser[]): Promise<IUser[]> {
    return await userRepository.createMany(users);
  }
}

export const userService = new UserController();
