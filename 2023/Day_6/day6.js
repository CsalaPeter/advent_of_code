let fs = require("fs");

let data = fs.readFileSync("input.txt", "utf8").split("\n");

function part1() {
  const [, ...time] = data[0]
    .split(" ")
    .filter((x) => x.length)
    .map(Number);

  const [, ...distance] = data[1]
    .split(" ")
    .filter((x) => x.length)
    .map(Number);

  let win = time.reduce((acc, lap, i) => {
    let delta = Math.sqrt(lap * lap - 4 * distance[i]);
    let r1 = (-1 * lap + delta) / -2;
    let r2 = (-1 * lap - delta) / -2;

    let min = Math.floor(Math.min(r1, r2));
    let max = Math.ceil(Math.max(r1, r2)) - 1;

    let num = max - min;
    acc *= num;
    return acc;
  }, 1);
  console.log("Part 1's answer: " + win);
}

function part2() {
  let time = data[0]
    .split(" ")
    .filter((x) => x.length && Number(x))
    .join("");
  time = Number(time);

  let distance = data[1]
    .split(" ")
    .filter((x) => x.length && Number(x))
    .join("");
  distance = Number(distance);

  let delta = Math.sqrt(time * time - 4 * distance);
  let r1 = (-1 * time + delta) / -2;
  let r2 = (-1 * time - delta) / -2;

  let min = Math.floor(Math.min(r1, r2));
  let max = Math.ceil(Math.max(r1, r2)) - 1;

  let num = max - min;

  console.log("Part 2's answer: " + num);
}

part1();
part2();
