const fs = require("fs");
const t0 = performance.now();

const data = fs.readFileSync("input.txt", "utf8").split("\n");

const t1 = performance.now();

const totalScore1 = data
  .map((line) => {
    switch (line) {
      case "A X": // rock + draw,
        return 1 + 3;
      case "A Y": // paper + win
        return 2 + 6;
      case "A Z": // scissor + loss
        return 3 + 0;
      case "B X": // rock + loss
        return 1 + 0;
      case "B Y": // paper + draw
        return 2 + 3;
      case "B Z": // scissor + win
        return 3 + 6;
      case "C X": // rock + win
        return 1 + 6;
      case "C Y": // paper + loss
        return 2 + 0;
      case "C Z": // scissor + draw
        return 3 + 3;
    }
  })
  .reduce((acc, score) => acc + score, 0);

const totalScore2 = data
  .map((line) => {
    switch (line) {
      case "A X": // scissor + loss
        return 3 + 0;
      case "A Y": // rock + draw,
        return 1 + 3;
      case "A Z": // paper + win
        return 2 + 6;
      case "B X": // rock + loss
        return 1 + 0;
      case "B Y": // paper + draw
        return 2 + 3;
      case "B Z": // scissor + win
        return 3 + 6;
      case "C X": // paper + loss
        return 2 + 0;
      case "C Y": // scissor + draw
        return 3 + 3;
      case "C Z": // rock + win
        return 1 + 6;
    }
  })
  .reduce((acc, score) => acc + score, 0);

const t2 = performance.now();

let withfl = ((t2 - t0) * 1000).toFixed(2);
let withoutfl = ((t2 - t1) * 1000).toFixed(2);
console.log("Runtime with file read: " + withfl + " µs.");
console.log("Runtime without file read: " + withoutfl + " µs.");
console.log("Part one final score: " + totalScore1);
console.log("Part two final score: " + totalScore2);
