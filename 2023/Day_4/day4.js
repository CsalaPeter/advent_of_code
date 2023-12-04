let fs = require("fs");

let data = fs.readFileSync("input.txt", "utf8").split("\n");

function part1() {
  let points = 0;
  data.forEach((ticket) => {
    let [leftNumbers, rightNumbers] = ticket.split(":")[1].split("|");
    leftNumbers = leftNumbers.match(/\d+/g).map(Number);
    rightNumbers = rightNumbers.match(/\d+/g).map(Number);
    let winningNumbers = rightNumbers.filter((num) =>
      leftNumbers.includes(num)
    ).length;
    points += winningNumbers > 2 ? 2 ** (winningNumbers - 1) : winningNumbers;
  });
  console.log("Total Points: " + points + " pt");
}

function part2() {
  let i = 0;
  const tickets = data.map(() => 1);
  data.forEach((ticket) => {
    i++;
    let [leftNumbers, rightNumbers] = ticket.split(":")[1].split("|");
    leftNumbers = leftNumbers.match(/\d+/g).map(Number);
    rightNumbers = rightNumbers.match(/\d+/g).map(Number);
    let winningNumbers = rightNumbers.filter((num) =>
      leftNumbers.includes(num)
    ).length;
    for (let j = 0; j < winningNumbers; j++) {
      tickets[i + j] += tickets[i - 1];
    }
  });
  console.log(
    "Total scratchcards: " + tickets.reduce((acc, num) => acc + num) + " pc"
  );
}

part1();
part2();
