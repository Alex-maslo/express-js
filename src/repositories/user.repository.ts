import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return User.find({});
  }

  public async create(user: IUser): Promise<IUser> {
    const { password } = user;
    user.password = await bcrypt.hash(password, 10);
    return await User.create(user);
  }
}

export const userRepository = new UserRepository();
