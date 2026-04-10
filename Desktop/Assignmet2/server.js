require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ Correct MongoStore (LATEST VERSION)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),

  cookie: {
    httpOnly: true,
    secure: false, // true only in production (HTTPS)
    maxAge: 1000 * 60 * 30 // 30 minutes
  }
}));

// Routes
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// Login Route
app.post("/login", (req, res) => {
  const { username } = req.body;

  req.session.user = username;

  res.cookie("user", username, {
    httpOnly: true
  });

  res.json({ message: "Login successful ✅" });
});

// Protected Route
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized ❌" });
  }

  res.json({ message: `Welcome ${req.session.user} 🎉` });
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("user");
    res.send("Logged out 👋");
  });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🔥`);
});