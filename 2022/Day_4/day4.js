const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8").split("\n");

let assignments1 = 0;
let assignments2 = 0;

function pairContainsAnother(input) {
  for (let i = 0; i < input.length; i++) {
    const [firstRange, secondRange] = input[i]
      .split(",")
      .map((x) => x.split("-").map((y) => +y));
    if (
      (firstRange[0] >= secondRange[0] && firstRange[1] <= secondRange[1]) ||
      (secondRange[0] >= firstRange[0] && secondRange[1] <= firstRange[1])
    )
      assignments1 += 1;
  }
}

function pairsOverlap(input) {
  for (let i = 0; i < input.length; i++) {
    const [firstRange, secondRange] = input[i]
      .split(",")
      .map((x) => x.split("-").map((y) => +y));
    if (
      (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[0]) ||
      (secondRange[0] <= firstRange[0] && secondRange[1] >= firstRange[0])
    )
      assignments2 += 1;
  }
}

pairContainsAnother(data);
pairsOverlap(data);

console.log(assignments1 + " pair contains another");
console.log(assignments2 + " pairs overlap");
