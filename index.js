const express = require("express");
const app = express();
const port = 3000;

const users = [
  {
    id: 1,
    name: "Olexandr",
    email: "olexandr@example.com",
    password: "$2b$10$QqBh8YknqUt0KqYrxkP56O1Hr2G28eD9Mf0BW.NxwxdOJSm8rLM7K",
  },
  {
    id: 2,
    name: "Elena",
    email: "elena@example.com",
    password: "$2b$10$BHZc9O4fvMi0f7fMFoKHmeHjk4VK/wKcA0/56q3SY1h3fM7E4r36O",
  },
  {
    id: 3,
    name: "Ivan",
    email: "ivan@example.com",
    password: "$2b$10$z8zzFLdK5JlzF25PX8GBE.4GHrAf9xFcSYY.JPCU.vPd4kx2WEko6",
  },
  {
    id: 4,
    name: "Olena",
    email: "olena@example.com",
    password: "$2b$10$yo5RCBaCBJmbexvKnqN1QevO2pjA.OmZxuBipE1F/7mtZelUnW73a",
  },
  {
    id: 5,
    name: "Taras",
    email: "taras@example.com",
    password: "$2b$10$AeALF9yM5IM4D0O7jGp.JevDAfeY4AEArA9ZBx3mwKxAKFMBXyraG",
  },
  {
    id: 6,
    name: "Maria",
    email: "maria@example.com",
    password: "$2b$10$DOL.zYjNwHyGvUtxMky9euiULOK5HNsOcADIsrg1Nsn4O.SY9voHu",
  },
  {
    id: 7,
    name: "Petro",
    email: "petro@example.com",
    password: "$2b$10$AUfq6Tr6GYY9L77C3PKGyOxV3.ND9tTeYUEW.J1sNoZWog2oZaY3q",
  },
  {
    id: 8,
    name: "Nadia",
    email: "nadia@example.com",
    password: "$2b$10$AHTOBpxog3QmS4W5sKfjK.FD9xKKe2YOQaz5iS7lUrX6Y7RFBWEdO",
  },
  {
    id: 9,
    name: "Dmytro",
    email: "dmytro@example.com",
    password: "$2b$10$7CNec8kgY64UZ98ZQ7l8n.Q63IHnZmnLg1oBDZK5cFGY3GSkAgQvm",
  },
  {
    id: 10,
    name: "Iryna",
    email: "iryna@example.com",
    password: "$2b$10$OT8kBeUF41Soe/WApX8N9.ZnBCQ54FZFbZ3SY.bjeaQanYYb1bg9O",
  },
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
