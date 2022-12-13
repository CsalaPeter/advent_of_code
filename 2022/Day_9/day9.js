const fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((line) => {
    const [letter, number] = line.split(" ");
    return {
      direction: letter,
      move: parseInt(number),
    };
  });

const movesDefinition = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(direction) {
    const d = movesDefinition[direction];
    this.x += d.x;
    this.y += d.y;
  }
  follow(point) {
    const distance = Math.max(
      // Manhattan distance (|x1 - x2| + |y1 - y2|)
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    );
    if (distance > 1) {
      // 0 => do nothing
      // 1 or 2 => this.x++ or this.y++;
      // -1 or -2 => this.x-- or this.y--;
      const directionX = point.x - this.x;
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      const directionY = point.y - this.y;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
}

function markVisited(x, y, visited) {
  visited.add(`${x}-${y}`);
}

function part1() {
  const head = new Point(0, 0);
  const tail = new Point(0, 0);
  const visited = new Set();
  markVisited(0, 0, visited);

  for (const line of data) {
    for (let i = 0; i < line.move; i++) {
      head.move(line.direction);
      tail.follow(head);
      markVisited(tail.x, tail.y, visited);
    }
  }

  console.log(visited.size);
}

function part2() {
  const knots = new Array(10).fill(0).map((_) => new Point(0, 0));
  const visited = new Set();
  markVisited(0, 0, visited);

  for (const line of data) {
    for (let i = 0; i < line.move; i++) {
      // Move the head
      knots[0].move(line.direction);
      // Move the rest of the rope
      for (let knot = 1; knot < knots.length; knot++) {
        const point = knots[knot];
        point.follow(knots[knot - 1]);
      }
      const tail = knots[knots.length - 1];
      markVisited(tail.x, tail.y, visited);
    }
  }

  console.log(visited.size);
}

part1();
part2();
