import express from "express";
import validateYear from "../middleware/validateYear.js";

const router = express.Router();

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018 },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997 },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho", year: 1988 }
];

// GET all books (filter + pagination)
router.get("/", (req, res) => {
  let filteredBooks = books;

  // Filter
  if (req.query.author) {
    filteredBooks = filteredBooks.filter(
      book => book.author.toLowerCase() === req.query.author.toLowerCase()
    );
  }

  if (req.query.year) {
    filteredBooks = filteredBooks.filter(
      book => book.year == req.query.year
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || filteredBooks.length;

  const start = (page - 1) * limit;
  const end = start + limit;

  res.json({
    page,
    total: filteredBooks.length,
    data: filteredBooks.slice(start, end)
  });
});

// POST book
router.post("/", validateYear, (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Search by title
router.get("/search", (req, res) => {
  const title = req.query.title?.toLowerCase();

  if (!title) {
    return res.status(400).json({ error: "Title query required" });
  }

  const result = books.filter(book =>
    book.title.toLowerCase().includes(title)
  );

  res.json(result);
});

export default router;
