import { read, write } from "../services/fs.service";
import { ICreateUserDto, IUser } from "../interfaces/user.interface";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }

  public async create(dto: ICreateUserDto): Promise<IUser> {
    const users: IUser[] = await read();
    const { name, age, email, password } = dto;
    const userId = users.length ? users[users.length - 1].id + 1 : 1;

    if (!name) {
      throw new Error(`User with name ${name} already exists`);
    }

    const user = {
      id: userId,
      name: name,
      age: age,
      email: email,
      password: password,
    };
    users.push(user);
    await write(users);
    console.log(users);
    return user;
  }
}

export const userRepository = new UserRepository();
