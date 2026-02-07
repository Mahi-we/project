function capitalize(str) {
  return str.toUpperCase();
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) count++;
  }
  return count;
}

module.exports = {
  capitalize,
  reverse,
  countVowels
};
