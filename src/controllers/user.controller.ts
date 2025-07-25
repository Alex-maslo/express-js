import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { IUser } from "../interfaces/user.interface";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async createMany(req: Request, res: Response, next: NextFunction) {}
}

export const userController = new UserController();
