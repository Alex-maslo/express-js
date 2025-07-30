import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";
import { configs } from "./config/config";
import mongoose from "mongoose";

const app = express();
const port = configs.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message,
  });
});

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

async function startServer() {
  try {
    await mongoose.connect(configs.MONGO_URI);
    console.log("Підключено до MongoDB.");
  } catch (error) {
    console.error("Не вдалося підключитися до MongoDB:", error);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Сервер працює на http://${configs.APP_HOST}:${port}`);
  });
}

startServer()
  .then(() => {
    console.log("Server initialization complete.");
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
