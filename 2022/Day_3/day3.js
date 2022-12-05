const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf-8").split("\n");
const data2 = fs.readFileSync("input.txt", "utf-8").match(/(\w+(\n)?){3}/g);

let priority = 0;
let priority2 = 0;
const getPriority = (char) => {
  const lowercase = "a".charCodeAt(0) - 1;
  const uppercase = "A".charCodeAt(0) - 27;
  const input = char.charCodeAt(0);
  return input - (input < lowercase ? uppercase : lowercase);
};
const matchingCharacter = (comp1, comp2) => {
  for (let i in comp1) if (comp2.includes(comp1[i])) return comp1[i];
};
const matchingCharacter2 = (elf1, elf2, elf3) => {
  for (let i in elf1)
    if (elf2.includes(elf1[i]) && elf3.includes(elf1[i])) return elf1[i];
};

for (const rucksuck of data) {
  if (!rucksuck) break;
  const [first, second] = [
    rucksuck.slice(0, rucksuck.length / 2),
    rucksuck.slice(rucksuck.length / 2, rucksuck.length),
  ];
  const recurringCharacter = matchingCharacter(first, second);
  priority += getPriority(recurringCharacter);
}

for (const rucksuck of data2) {
  if (!rucksuck) break;
  const lines = rucksuck.split("\n").filter(Boolean);
  priority2 += getPriority(matchingCharacter2(...lines));
}

console.log(priority);
console.log(priority2);
