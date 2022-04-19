const test = {
  past: [{ day: 31 }, { month: 12 }, { year: 2020 }],
  present: [{ day: 1 }, { month: 1 }, { year: 2021 }],
};

const deepClone = (input) => {
  let result = Array.isArray(input) ? [] : {};
  if (typeof input !== "object") {
    return input;
  }
  for (let key in input) {
    result[key] = deepClone(input[key]);
  }
  return result;
};
