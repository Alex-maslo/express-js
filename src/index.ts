import path from "node:path";

import bcrypt from "bcrypt";
import express, { NextFunction, Request, Response } from "express";
import { constants } from "fs";
import fs from "fs/promises";

import { read, write } from "./fs.service";
import { IUser } from "./interfaces/user.interface";
import { ApiError } from "./errors/api-error";

const app = express();
const port = 3000;

const DATA_PATH = path.join(__dirname, "db.json");

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

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Імітація помилки:
    throw new ApiError("Test error: something went wrong", 404);

    // const users = await read();
    // res.status(200).send(users);
  } catch (e) {
    next(e);
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const users = await read();
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);
    const { name, email, age, password } = req.body;

    if (!name || !email || !age || !password) {
      return res.status(400).send("Missing name, email, age or password");
    }

    if (isNaN(age) || Number(age) < 0) {
      return res
        .status(400)
        .send("Age must be a valid number greater than or equal to 0");
    }

    if (name.length <= 3) {
      return res.status(400).send("Name must be longer than 3 characters");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const user = {
      id: newId,
      name: name,
      age: age,
      email: email,
      password: passwordHash,
    };

    users.push(user);

    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  const data = await fs.readFile("users.json", "utf8");
  const users = JSON.parse(data);
  const userId = Number(req.params.id);
  const user = users.find((user: IUser) => user.id === userId);

  res.status(200).send(user);
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile("users.json", "utf8");
    let users = JSON.parse(data);

    const id = Number(req.params.id);
    const user = users.find((user: IUser) => user.id === id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    users = users.filter((user: IUser) => user.id !== id);

    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    res.status(204).end();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/users/batch", async (req: Request, res: Response) => {
  try {
    const incomingUsers = req.body;

    if (!Array.isArray(incomingUsers)) {
      return res.status(400).json({ error: "Expected an array of users" });
    }

    const existingUsers = await read();
    let lastId =
      existingUsers.length > 0 ? existingUsers[existingUsers.length - 1].id : 0;

    const newUsers = [];

    for (const u of incomingUsers) {
      const { name, email, age, password } = u;

      // Валідація
      if (!name || !email || !age || !password) {
        return res
          .status(400)
          .json({ error: "Each user must have name, email, age and password" });
      }

      if (isNaN(age) || Number(age) < 0) {
        return res.status(400).json({ error: `Invalid age for user ${name}` });
      }

      if (name.length <= 3) {
        return res
          .status(400)
          .json({ error: `Name '${name}' must be longer than 3 characters` });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      lastId++;

      const user = {
        id: lastId,
        name,
        email,
        age,
        password: passwordHash,
      };

      newUsers.push(user);
    }

    const updatedUsers = [...existingUsers, ...newUsers];
    await write(updatedUsers);
    res.status(201).json({
      message: "Users created successfully",
      users: newUsers,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log(next());
  res.status(error.status || 500).send(error.message);
});

startServer()
  .then(() => {
    console.log("Server initialization complete.");
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
