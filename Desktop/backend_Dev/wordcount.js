const fs = require("fs");

// read file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file");
    return;
  }

  // count words
  const words = data.trim().split(/\s+/).length;

  // write result to new file
  fs.writeFile("output.txt", `Word Count: ${words}`, (err) => {
    if (err) {
      console.log("Error writing file");
    } else {
      console.log("Word count written to output.txt");
    }
  });
});
