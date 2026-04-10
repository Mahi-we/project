const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../requests.log");

function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const log = `${new Date().toISOString()} | ${req.method} ${req.url} | ${res.statusCode} | ${Date.now() - start}ms\n`;

    fs.appendFile(logFile, log, (err) => {
      if (err) console.error(err);
    });
  });

  next();
}

module.exports = logger;