const pointSystem1 = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const shapeBonus = {
  X: 1,
  Y: 2,
  Z: 3,
};

const pointSystem2 = {
  A: {
    X: 0 + 3,
    Y: 3 + 1,
    Z: 6 + 2,
  },
  B: {
    X: 0 + 1,
    Y: 3 + 2,
    Z: 6 + 3,
  },
  C: {
    X: 0 + 2,
    Y: 3 + 3,
    Z: 6 + 1,
  },
};

module.exports = { pointSystem1, pointSystem2, shapeBonus };
