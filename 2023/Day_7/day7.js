let fs = require("fs");

let data = fs.readFileSync("input.txt", "utf8").replace(/\r/g, "").split("\n");

const cardValues = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

function part1() {
  data.sort((a, b) => {
    const hand_A = a.split(" ")[0];
    const hand_B = b.split(" ")[0];
    return sortHands(hand_B, hand_A);
  });

  const wins = data.reduce((acc, line, i) => {
    const bid = line.split(" ")[1];
    acc += bid * (i + 1);
    return acc;
  }, 0);
  console.log(wins);
}

const getHand = (hand) => {
  const handSet = {};
  for (let i = 0; i < hand.length; i++) {
    handSet[hand[i]] = handSet[hand[i]] || 0;
    handSet[hand[i]] += 1;
  }
  return handSet;
};

const getRank = (hand) => {
  const handSet = getHand(hand);

  let hasPair = false;
  let hasThree = false;

  for (let key in handSet) {
    const val = handSet[key];
    if (val === 5) {
      return 7;
    }
    if (val === 4) {
      return 6;
    }
    if ((val === 3 && hasPair) || (val === 2 && hasThree)) {
      return 5;
    }
    if (val === 2 && hasPair) {
      return 3;
    }
    if (val === 3) {
      hasThree = true;
    }
    if (val === 2) {
      hasPair = true;
    }
  }

  if (hasThree) return 4;
  if (hasPair) return 2;
  return 1;
};

const tieBreaker = (hand_A, hand_B) => {
  for (let i = 0; i < hand_A.length; i++) {
    const cardA = hand_A[i];
    const cardB = hand_B[i];
    const hand_A_Val = isNaN(Number(cardA)) ? cardValues[cardA] : Number(cardA);
    const hand_B_Val = isNaN(Number(cardB)) ? cardValues[cardB] : Number(cardB);

    if (hand_A_Val > hand_B_Val) return -1;
    if (hand_B_Val > hand_A_Val) return 1;
  }

  return 0;
};

const sortHands = (hand_A, hand_B) => {
  const handValueA = getRank(hand_A);
  const handValueB = getRank(hand_B);
  if (handValueA > handValueB) return -1;
  if (handValueB > handValueA) return 1;
  return tieBreaker(hand_A, hand_B);
};

part1();
