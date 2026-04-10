import express from "express";

const router = express.Router();
let authors = [];

// Create author
router.post("/", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// Get all
router.get("/", (req, res) => {
  res.json(authors);
});

// Get one
router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }
  res.json(author);
});

// Update
router.put("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  author.name = req.body.name;
  res.json(author);
});

// Delete
router.delete("/:id", (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.json({ message: "Author deleted" });
});

export default router;
