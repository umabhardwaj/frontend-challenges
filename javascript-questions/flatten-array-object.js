Array.prototype.flatten = function () {
  let flatArray = [];
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (Array.isArray(element)) {
      flatArray = flatArray.concat(this.flatten.call(element));
    } else {
      flatArray.push(element);
    }
  }
  return flatArray;
};
var flattenObj = {};
const flattenObject = (obj, keyName) => {
  Object.keys(obj).forEach((key) => {
    var newKey = `${keyName}_${key}`;
    if (typeof obj[key] === "object") {
      flattenObj(obj[key], newKey);
    } else {
      flattenObj[newKey] = obj[key];
    }
  });
};
