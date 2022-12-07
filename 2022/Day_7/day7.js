const fs = require("fs");

const t0 = performance.now();
const datastream = fs.readFileSync("input.txt", "utf-8").split("\n");

const totalSize = 100000;
const diskSpace = 70000000;
const spaceNeeded = 30000000;
let result = 0;
let directories = [];
const directoryList = [];
const directoryStack1 = [];
const directoryStack2 = [];
const memoizedDirectories = [];

const t1 = performance.now();

for (const line of datastream) {
  if (line === "") continue;
  const lineSplit = line.split(" ");

  if (lineSplit[0] === "$") {
    if (lineSplit[1] === "ls") {
      continue;
    } else {
      if (lineSplit[2] === "..") {
        const removedDirectory = directoryStack1.pop();
        directoryList.push(removedDirectory);
      } else {
        directoryStack1.push({
          name: lineSplit[2],
          size: 0,
        });
      }
    }
  } else if (lineSplit[0] === "dir") {
    continue;
  } else {
    for (const directory1 of directoryStack1) {
      directory1.size += Number(lineSplit[0]);
    }
  }
}

for (const directory1 of [...directoryStack1, ...directoryList]) {
  if (directory1.size <= totalSize) {
    result += directory1.size;
  }
}

console.log(directoryStack1, directoryList);

for (const line of datastream) {
  if (line === "") continue;
  const lineSplit = line.split(" ");

  if (lineSplit[0] === "$") {
    if (lineSplit[1] === "ls") {
      continue;
    } else {
      if (lineSplit[2] === "..") {
        const removedDirectory = directoryStack2.pop();
        memoizedDirectories.push(removedDirectory);
      } else {
        directoryStack2.push({
          name: lineSplit[2],
          size: 0,
        });
      }
    }
  } else if (lineSplit[0] === "dir") {
    continue;
  } else {
    for (const directory of directoryStack2) {
      directory.size += Number(lineSplit[0]);
    }
  }
}

directories = [...directoryStack2, ...memoizedDirectories];
const rootDirectory = directories.find((directory) => directory.name === "/");
const currentFreeSpace = diskSpace - rootDirectory.size;
const neededSpace = spaceNeeded - currentFreeSpace;
const possibleDirectories = directories.filter(
  (directory) => directory.size > neededSpace
);

const t2 = performance.now();

let withfl = ((t2 - t0) * 1000).toFixed(2);
let withoutfl = ((t2 - t1) * 1000).toFixed(2);
console.log("Runtime with file read: " + withfl + " µs.");
console.log("Runtime without file read: " + withoutfl + " µs.");
console.log(result);
console.log(possibleDirectories.sort((a, b) => a.size - b.size)[0].size);
