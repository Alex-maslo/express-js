import path from "node:path";

import express, { NextFunction, Request, Response } from "express";
import { constants } from "fs";
import fs from "fs/promises";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();
const port = 3000;

const DATA_PATH = path.join(process.cwd(), "db.json");

async function checkAndCreateFile(pathToFile: string) {
  try {
    await fs.access(pathToFile, constants.F_OK);
  } catch {
    await fs.writeFile(pathToFile, "[]", "utf8");
  }
}

async function startServer() {
  await checkAndCreateFile(DATA_PATH);
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error.status || 500).send(error.message);
});

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

startServer()
  .then(() => {
    console.log("Server initialization complete.");
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
