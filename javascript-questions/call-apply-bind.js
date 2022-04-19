Function.prototype.newCall = function (obj, ...args) {
  obj.fn = this;
  obj.fn(...args);
};

Function.prototype.newApply = function (obj, ...args) {
  obj.fn = this;
  obj.fn(args);
};

Function.prototype.newBind = function (context) {
  const currentContext = this;
  const currentArguments = Array.prototype.slice.call(arguments, 1);
  return function () {
    const args = arguments;
    currentContext.apply(context, currentArguments.concat(args));
  };
};
