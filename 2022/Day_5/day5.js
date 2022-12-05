const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

let [crateInput, instructionsInput] = input.split("\n\n");
let result = "";
let result2 = "";

const t0 = performance.now();

const instructions = instructionsInput.split("\n").map((instruction) => {
  const match = instruction.match(/move (\d+) from (\d+) to (\d+)/);
  console.log(match);
  return [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
    parseInt(match[3], 10),
  ];
});

const cratesLines = crateInput.split("\n").slice(0, -1);
const crates = [];
const crates2 = [];

for (let i = cratesLines.length - 1; i >= 0; i--) {
  const match = cratesLines[i].match(/(\[[A-Z]\]\s?|   \s?)/g);
  console.log(match);
  for (let j = 0; j < match.length; j++) {
    if (!crates[j]) {
      crates[j] = [];
      crates2[j] = [];
    }
    const letter = match[j].match(/([A-Z])/g);
    console.log(letter);
    if (letter !== null) {
      crates[j].push(letter[0]);
      crates2[j].push(letter[0]);
    }
  }
}

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];
  console.log(instruction);
  for (let moves = 0; moves < instruction[0]; moves++) {
    crates[instruction[2] - 1].push(crates[instruction[1] - 1].pop());
  }
}

console.log(crates);
for (let i = 0; i < crates.length; i++) {
  result += crates[i].pop();
}

const t1 = performance.now();

console.log("The first result is: " + result);
console.log("The first time is: " + (t1 - t0) + " milliseconds");

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];
  crates2[instruction[2] - 1].push(
    ...crates2[instruction[1] - 1].slice(-1 * instruction[0])
  );
  crates2[instruction[1] - 1].splice(-1 * instruction[0]);
}

for (let i = 0; i < crates2.length; i++) {
  result2 += crates2[i].pop();
}

const t2 = performance.now();

console.log("The second result is: " + result2);
console.log("The second time is: " + (t2 - t0) + " milliseconds");
