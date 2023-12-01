let fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8").split("\n");
let sum1 = 0;
let sum2 = 0;
let words = {
  one: 1,
  oneight: 18,
  two: 2,
  twone: 21,
  three: 3,
  threeigth: 38,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  sevenine: 79,
  eight: 8,
  eightwo: 82,
  nine: 9,
};

function part1() {
  data.forEach((nums1) => {
    if (nums1.match(/\d/g) != null) {
      let numbers = nums1.match(/\d/g);
      sum1 += parseInt(numbers[0] + numbers[numbers.length - 1]);
    }
  });
  console.log("Part 1's answer: " + sum1);
}

function part2() {
  data.forEach((nums2) => {
    let replaced = nums2.replace(
      /sevenine|threeigth|eightwo|oneight|one|twone|two|three|four|five|six|seven|eight|nine/gi,
      function (matched) {
        return words[matched];
      }
    );
    console.log(replaced);
    if (nums2.match(/\d/g) != null) {
      let numbers = replaced.match(/\d/g);
      sum2 += parseInt(numbers[0] + numbers[numbers.length - 1]);
    }
  });
  console.log("Part 2's answer: " + sum2);
}

part1();
part2();
