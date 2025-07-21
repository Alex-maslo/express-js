const express = require("express");
const app = express();
const port = 3000;

const users = [
  {
    id: 1,
    name: "Olexandr",
    email: "olexandr@example.com",
    password: "pass123",
  },
  { id: 2, name: "Elena", email: "elena@example.com", password: "qwe456" },
  { id: 3, name: "Ivan", email: "ivan@example.com", password: "zxc789" },
  { id: 4, name: "Olena", email: "olena@example.com", password: "abc321" },
  { id: 5, name: "Taras", email: "taras@example.com", password: "pass999" },
  { id: 6, name: "Maria", email: "maria@example.com", password: "maria123" },
  { id: 7, name: "Petro", email: "petro@example.com", password: "petro321" },
  { id: 8, name: "Nadia", email: "nadia@example.com", password: "nadia456" },
  { id: 9, name: "Dmytro", email: "dmytro@example.com", password: "dmytro789" },
  { id: 10, name: "Iryna", email: "iryna@example.com", password: "iryna111" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  try {
    res.send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/users", (req, res) => {
  res.send("User Created");
});

app.get("/users/:id", (req, res) => {
  try {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
