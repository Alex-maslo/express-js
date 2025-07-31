import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return User.find({});
  }

  public async getOne(userId: string): Promise<IUser> {
    return User.findById(userId);
  }

  public async create(user: IUser): Promise<IUser> {
    const { password } = user;
    user.password = await bcrypt.hash(password, 10);
    return await User.create(user);
  }

  public async createMany(users: IUser[]): Promise<IUser[]> {
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    );

    return await User.insertMany(hashedUsers);
  }
}

export const userRepository = new UserRepository();
