import { read, write } from "../services/fs.service";
import { ICreateUserDto, IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { ApiError } from "../errors/api-error";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }

  public async getOne(id: number): Promise<IUser> {
    const users: IUser[] = await read();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new ApiError(404, `User with id ${id} not found`);
    }
    return user;
  }

  public async create(dto: ICreateUserDto): Promise<IUser> {
    const users: IUser[] = await read();
    const { name, age, email, password } = dto;
   
    const userId = users.length ? users[users.length - 1].id + 1 : 1;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = {
      id: userId,
      name: name,
      age: age,
      email: email,
      password: hashedPassword,
    };
    users.push(user);
    await write(users);
    return user;
  }

  public async createMany(usersDto: ICreateUserDto[]): Promise<IUser[]> {
    const users: IUser[] = await read();

    for (const dto of usersDto) {
      const { name, age, email, password } = dto;
      const userId = users.length ? users[users.length - 1].id + 1 : 1;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = {
        id: userId,
        name: name,
        age: age,
        email: email,
        password: hashedPassword,
      };
      users.push(user);
    }

    await write(users);
    return users;
  }

  public async delete(id: number): Promise<IUser> {
    const users: IUser[] = await read();
    const userIndex = users.findIndex((u) => {
      return u.id === id;
    });

    if (userIndex === -1) {
      throw new ApiError(404, `User with id ${id} not found`);
    }

    const [deletedUser] = users.splice(userIndex, 1);
    await write(users);

    return deletedUser;
  }
}

export const userRepository = new UserRepository();
