const generateHashKey = (args, separator = "||") => {
  const stringifiedArgs = args.map((arg) =>
    typeof arg === "object" ? JSON.stringify(arg) : arg
  );
  return stringifiedArgs.join(separator);
};

const memoize = () => {
  const cache = {};
  return (fn, args = []) => {
    const key = generateHashKey(args);
    if (key && !cache.hasOwnProperty(key)) {
      cache[key] = fn.apply(null, args);
    }
    return cache[key];
  };
};

const multiplier = (a, b) => a * b;
const Memoize = memoize();
const result = Memoize(multiplier, [2, 3]);
console.log(result);

// eg. of router for async task and memoize;
const express = require("express");
const router = express.Router();

const greet = (req, res) => {
  res.json({ message: "Hello World" });
};

const greetPerson = (req, res) => {
  const { name } = req.params;
  setTimeout(() => {
    res.json({ message: `Hello ${name}!` });
  }, 4000);
};

//routes
router.get("/", greet);
router.get("/:name", greetPerson);
module.exports = router;

//memoizeAsync

const memoizeAsync = () => {
  const cache = {};
  return (config, callback) => {
    const { url, key, duration } = config;
    if (cache.hasOwnProperty(key)) {
      callback(cache[key].data);
      return;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        cache[key] = { data, duration };
        callback(cache[key].data);
      });
  };
};
