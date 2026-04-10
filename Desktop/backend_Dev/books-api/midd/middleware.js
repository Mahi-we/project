function validateYear(req, res, next) {
  const year = req.body.year;

  if (typeof year !== "number") {
    return res.status(400).json({ error: "Year must be a number" });
  }

  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear) {
    return res.status(400).json({ error: "Year out of valid range" });
  }

  next();
}

export default validateYear;
