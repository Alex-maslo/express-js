import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { ICreateUserDto, IUser } from "../interfaces/user.interface";

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

  public async createMany(req: Request, res: Response, next: NextFunction) {
    try {
      const dtos: ICreateUserDto[] = req.body;
      const result = await userService.createMany(dtos);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
