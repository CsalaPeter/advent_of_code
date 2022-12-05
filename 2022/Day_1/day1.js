const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
let maxCalories = 0;
let allCal = [];
let top3 = [0, 0, 0];

data?.split("\n\n").forEach((elf) => {
  const elfCalories = elf
    .split("\n")
    .reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue),
      0
    );
  allCal.push(elfCalories);
  if (elfCalories > maxCalories) {
    maxCalories = elfCalories;
  }
});

console.log(maxCalories);
top3 = allCal.sort((a, b) => b - a).slice(0, 3);
top3Sum = top3.reduce(
  (accumulator, currentValue) => accumulator + parseInt(currentValue),
  0
);
console.log(top3);
console.log(top3Sum);
