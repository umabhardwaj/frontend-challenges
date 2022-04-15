var class1 = function () {
  this.result = 0;
  this.add = function (input) {
    this.result += input;
    return this;
  };
  this.substract = function (input) {
    this.result -= input;
    return this;
  };
  this.print = function () {
    console.log(this.result);
  };
};
var object = new class1();
object.add(3).substract(2).print();

// instead of returning result from each operation function, return the obj itself which help in accessing the anothr method in that object itself.
const Maths = (number = 0) => {
  let result = init;
  const ops = {
    add(...args) {
      result = args.reduce((acc, current) => acc + current, result);
      return ops;
    },
    subtract(...args) {
      result = args.reduce((acc, current) => acc - current, result);
      return ops;
    },
    multiply(multiplier) {
      result = result * multiplier;
      return ops;
    },
    divide(divisor) {
      result = result / divisor;
      return ops;
    },
    getResult() {
      return result;
    },
  };
  return ops;
};

const maths = Maths();
const result = maths
  .add(10, 20)
  .multiply(2)
  .subtract(10, 20, 30)
  .divide(2)
  .getResult();
console.log(result);

// above solution with closures have problem of memory if were returning long list of objects
// so we can make use of function prototype

function Maths(init) {
  this.result = init;
  this.getResult = function () {
    return this.result;
  };
}
Maths.prototype.add = function (...args) {
  this.result = args.reduce((acc, current) => acc + current, result);
  return this;
};
Maths.prototype.substract = function (...args) {
  this.result = args.reduce((acc, current) => acc - current, result);
  return this;
};
Maths.prototype.multiply = function (multiplier) {
  this.result = result * multiplier;
  return this;
};
Maths.prototype.divide = function () {
  this.result = result / divisor;
  return this;
};
