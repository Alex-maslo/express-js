const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

const fs = require("fs/promises");
const { constants } = require("fs");

async function checkAndCreateFile(path) {
  try {
    await fs.access(path, constants.F_OK);
  } catch (err) {
    await fs.writeFile(path, "[]", "utf8");
  }
}

void checkAndCreateFile("users.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/users", async (req, res) => {
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

app.patch("/users/:id", async (req, res) => {
  const data = await fs.readFile("users.json", "utf8");
  const users = JSON.parse(data);

  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  const index = users.findIndex((user) => user.id === id);

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

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

  const updatedUser = {
    id: users[index].id,
    name: req.body.name || users[index].name,
    age: req.body.age || users[index].age,
    email: req.body.email || users[index].email,
    password: req.body.password
      ? await bcrypt.hash(req.body.password, salt)
      : users[index].password,
  };

  users[index] = updatedUser;

  await fs.writeFile("users.json", JSON.stringify(users, null, 2));

  res.send(updatedUser);
});

app.delete("/users/:id", async (req, res) => {
  try {
    const data = await fs.readFile("users.json", "utf8");
    let users = JSON.parse(data);

    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    users = users.filter((user) => user.id !== id);

    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    res.status(204).end();
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
