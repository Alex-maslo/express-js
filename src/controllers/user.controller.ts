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

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await userService.getOne(id);
      res.status(200).json(user);
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
      const usersDto: ICreateUserDto[] = req.body;
      const result = await userService.createMany(usersDto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const user = await userService.delete(userId);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
