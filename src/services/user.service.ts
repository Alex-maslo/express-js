import { userRepository } from "../repositories/user.repository";
import { ICreateUserDto, IUser } from "../interfaces/user.interface";

class UserController {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: ICreateUserDto) {
    return await userRepository.create(dto);
  }

  public async createMany(usersDto: ICreateUserDto[]) {
    return await userRepository.createMany(usersDto);
  }
}

export const userService = new UserController();
