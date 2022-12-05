const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
let maxCalories = 0;

data?.split("\n\n").forEach((elf) => {
  const elfCalories = elf
    .split("\n")
    .reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue),
      0
    );
  if (elfCalories > maxCalories) {
    maxCalories = elfCalories;
  }
});

console.log(maxCalories);
