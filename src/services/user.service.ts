import { userRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

class UserController {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(user: IUser): Promise<IUser> {
    return await userRepository.create(user);
  }
}

export const userService = new UserController();
