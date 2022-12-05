const fs = require("fs");
const { pointSystem1, pointSystem2, shapeBonus } = require("./consts.js");

const data = fs.readFileSync("input.txt", "utf8");

let totalScore1 = 0;
let totalScore2 = 0;

data.split("\n").forEach((guideLine) => {
  const strategy = guideLine.split(" ");
  const opponent = strategy[0];
  const player = strategy[1];
  totalScore1 += pointSystem1[opponent][player] + shapeBonus[player];
  totalScore2 += pointSystem2[opponent][player];
});

console.log("Part one final score: " + totalScore1);
console.log("Part two final score: " + totalScore2);
