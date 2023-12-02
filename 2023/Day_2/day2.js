let fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf8")
  .replace(/\r/g, "")
  .split("\n");

function part1() {
  let gameSum = 0;
  data.forEach((e) => {
    let [game, draw] = e.split(": ");
    let draws = draw.split("; ");
    let valid = true;

    draws.forEach((d) => {
      let bag = {
        red: 12,
        green: 13,
        blue: 14,
      };

      d.split(", ").forEach((cube) => {
        let [num, color] = cube.split(" ");
        num = parseInt(num);
        bag[color] -= num;

        for (let id of Object.keys(bag)) {
          if (bag[id] < 0) {
            valid = false;
            break;
          }
        }
      });
    });

    if (valid) {
      gameSum += parseInt(game.split(" ")[1]);
    }
  });
  console.log("Part 1's answer: " + gameSum);
}

function part2() {
  let gameSum = 0;
  data.forEach((e) => {
    let [game, draw] = e.split(": ");
    let draws = draw.split("; ");
    let globalBag = {
      red: 0,
      green: 0,
      blue: 0,
    };

    draws.forEach((d) => {
      let bag = {
        red: 0,
        green: 0,
        blue: 0,
      };

      d.split(", ").forEach((cube) => {
        let [num, color] = cube.split(" ");
        num = parseInt(num);
        bag[color] += num;
      });

      Object.keys(bag).forEach((id) => {
        if (bag[id] > globalBag[id]) {
          globalBag[id] = bag[id];
        }
      });
    });
    let power = globalBag.red * globalBag.green * globalBag.blue;
    gameSum += power;
  });
  console.log("Part 2's answer: " + gameSum);
}

part1();
part2();
