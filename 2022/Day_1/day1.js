const fs = require("fs");

const t0 = performance.now();

const data = fs.readFileSync("input.txt", "utf8").split("\n\n");
let allCal = [0];

const t1 = performance.now();

data.forEach((elf) => {
  const elfCalories = elf
    .split("\n")
    .reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue),
      0
    );
  allCal.push(elfCalories);
});

const maxCalories = allCal.sort((a, b) => b - a)[0];
const top3sum = allCal
  .slice(0, 3)
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

const t2 = performance.now();

let withfl = ((t2 - t0) * 1000).toFixed(2);
let withoutfl = ((t2 - t1) * 1000).toFixed(2);
console.log("Runtime with file read: " + withfl + " µs.");
console.log("Runtime without file read: " + withoutfl + " µs.");
console.log(maxCalories);
console.log(top3sum);
