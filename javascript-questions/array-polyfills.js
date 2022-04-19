Array.prototype.newMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result[i] = callback(this[i], i);
  }
  return result;
};

Array.prototype.newFilter = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.newReduce = function (callback, startingValue) {
  let accumulator = startingValue || undefined;
  for (let i = 0; i < this.length; i++) {
    if (accumulator) {
      accumulator = callback(accumulator, this[i]);
    } else {
      accumulator = this[i];
    }
  }

  return accumulator;
};

Array.prototype.newForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (this.indexOf(this[i]) > -1) {
      callback(this[i]);
    }
  }
};

const arr = [1, 2, 3, 4];
console.log(arr.newFilter((item) => item % 2 == 0));

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.newReduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
