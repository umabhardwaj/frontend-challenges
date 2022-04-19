function throttle(fun, timeduration) {
  let shouldCall = true;
  return (...args) => {
    if (shouldCall) {
      shouldCall = false;
      fun(...args);
      setTimeout(() => {
        shouldCall = true;
      }, timeduration);
    }
  };
}

function debounce(fun, timeduration) {
  let lastTimeoutId = 0;
  return (...args) => {
    if (lastTimeoutId) {
      clearTimeout(lastTimeoutId);
    }
    lastTimeoutId = setTimeout(() => {
      fun(...args);
    }, timeduration);
  };
}
