import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.get("/:id", userController.getOne);

router.post("/", userController.create);
router.post("/batch", userController.createMany);

export const userRouter = router;
