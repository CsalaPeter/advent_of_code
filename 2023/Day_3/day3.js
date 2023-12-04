let fs = require("fs");

let data = fs
  .readFileSync("input.txt", "utf8")
  .replace(/\r/g, "")
  .split("\n")
  .map((line) => line.split(""));

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const numbers = [];
let currentNumber = "";
let readingNumber = false;
for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[row].length; col++) {
    let char = data[row][col];
    if (readingNumber) {
      if (digits.includes(char)) {
        currentNumber += char;
      } else {
        readingNumber = false;
        numbers.push({
          number: currentNumber,
          row,
          col,
        });
      }
    } else {
      if (digits.includes(char)) {
        currentNumber = char;
        readingNumber = true;
      } else {
      }
    }
  }
  if (readingNumber) {
    readingNumber = false;
    numbers.push({
      number: currentNumber,
      row,
      col: data[row].length,
    });
  }
}

const coordinates = numbers.map(({ number, row, col }) => {
  const newCoordinates = [];
  newCoordinates.push([row, col]);
  newCoordinates.push([row, col - number.length - 1]);
  for (let i = 0; i < number.length + 2; i++) {
    newCoordinates.push([row - 1, col - i]);
    newCoordinates.push([row + 1, col - i]);
    console.log(newCoordinates);
  }
  return { number, newCoordinates };
});

const isSymbolAdjacent = (pair) => {
  const [row, col] = pair;
  if (row < 0 || row >= data.length) return false;
  const rowTokens = data[row];
  if (col < 0 || col >= rowTokens.length) return false;
  const token = rowTokens[col];
  if (token === ".") return false;
  if (digits.includes(token)) return false;
  return true;
};

const hasSymbolAdjacent = (newCoordinates) =>
  newCoordinates.reduce((any, pair) => any || isSymbolAdjacent(pair), false);

const numbersAdjacentToSymbols = coordinates
  .filter(({ number, newCoordinates }) => hasSymbolAdjacent(newCoordinates))
  .map(({ number }) => +number);

const total = numbersAdjacentToSymbols.reduce((tot, num) => tot + num, 0);

console.log(total);
