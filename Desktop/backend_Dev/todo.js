const express = require("express");
const app = express();

app.use(express.json());

let todos = [];

// CREATE
app.post("/todos", (req, res) => {
  todos.push(req.body);
  res.send("Todo added");
});

// READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

// UPDATE
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos[id] = req.body;
  res.send("Todo updated");
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.send("Todo deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
