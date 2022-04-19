let sum = function (x, y) {
  console.log(x + y);
};

let sum1 = sum.bind(this, 2);
console.log(sum1(3)); //5
//-------------------------------------------
let sumF = (a) => {
  return (b) => {
    return b ? sumF(a + b) : a;
  };
};

console.log(sumF(1)(2)(3)()); // 6

//-------------------------------------------

function sumFunc(a, b) {
  return a + b;
}

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const curriedSum = curry(sumFunc);
console.log(curriedSum(2, 3));
