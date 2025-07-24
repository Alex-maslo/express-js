import fs from "node:fs/promises";
import path from "node:path";

import { IUser } from "./interfaces/user.interface";

const read = async (): Promise<IUser[]> => {
  try {
    const pathToFile = path.join(__dirname, "db.json");
    const data = await fs.readFile(pathToFile, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Помилка запису", e.message);
  }
};

const write = async (users: IUser[]): Promise<void> => {
  try {
    const pathToFile = path.join(__dirname, "db.json");
    await fs.writeFile(pathToFile, JSON.stringify(users, null, 2));
  } catch (e) {
    console.log("Помилка запису", e.message);
  }
};

export { read, write };
