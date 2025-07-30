import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

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
      const result = await userService.create(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
