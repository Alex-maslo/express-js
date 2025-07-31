import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { IUser } from "../interfaces/user.interface";

class UserController {
  public async getList(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const result: IUser = await userService.getOne(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.create(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async createMany(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.createMany(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
