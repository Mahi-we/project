
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);