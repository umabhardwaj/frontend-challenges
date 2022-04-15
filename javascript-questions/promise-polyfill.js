/* 
new Promise(executor:(resolve)=>{
resolve(value:10)
}).then((data)=>{
    console.log(data);
})
*/

// for synchronous task as above
class MyPromise {
  resolvedData;
  isResolved = false;
  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;
    };
    executor(resolve);
  }
  then(fn) {
    if (this.isResolved) {
      fn(this.resolvedData);
    }
  }
}

new Promise((resolve) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
}).then((data) => {
  console.log(data);
});
//for async task as above

/*
if we use the above MyPromise implementation for above ,then 
1. executor is being called and its an async fn so it would go to the web apis without resolving 
and so execution gets passed to then , for which isResolved is still false.. 
so then is being executed but without the if block and it lost execution context afterwards
... so need to maintain the context of then function -- in thenFunc
*/

class MyPromise2 {
  resolvedData;
  isResolved = false;
  thenFunction; // for async then
  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;
      if (typeof this.thenFunction === "function")
        // to handle sync scenario,because in those ones thenFunction would not have any context as then was not run
        this.thenFunction(this.resolvedData);
    };
    executor(resolve);
  }
  then(fn) {
    this.thenFunction = fn;
    if (this.isResolved) {
      this.thenFunction(this.resolvedData);
    }
  }
}

//to perform then chaining
/*
1. need to retunr this from then so that we can chain
2. when we are chaining multiple thens , we are executing multiple callbacks,
   so we need to track those callbacks also.
   change thenFunc -> resolveChain = []; and in then, push the callback
   so we need to change the if conditions also accordingly for array length
   and while calling the callback function in resolve ,we would use reduce method to apply callback and return a value(response) to next then

*/

class MyPromise3 {
  resolvedData;
  isResolved = false;
  resolveChain = []; // for multi chaining of then

  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;
      if (this.resolveChain.length)
        // to handle sync scenario,because in those ones thenFunction would not have any context as then was not run
        this.resolveChain.reduce((acc, fn) => {
          return fn(acc);
        }, this.resolvedData);
    };

    executor(resolve);
  }
  then(fn) {
    this.resolveChain.push(fn);
    if (this.isResolved) {
      this.resolveChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.resolvedData);
    }
    return this;
  }
}

// For adding reject

class MyPromise3 {
  resolvedData;
  isResolved = false;
  resolveChain = [];

  // for rejection
  rejctedData;
  isRejected = false;
  rejectedChain = [];

  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;

      if (this.resolveChain.length)
        // to handle sync scenario,because in those ones thenFunction would not have any context as then was not run
        this.resolveChain.reduce((acc, fn) => {
          return fn(acc);
        }, this.resolvedData);
    };

    const reject = (value) => {
      this.rejctedData = value;
      this.isRejected = true;
      if (this.rejectedChain.length) {
        this.rejectedChain.reduce((acc, fn) => fn(acc), this.rejctedData);
      }
    };
    executor(resolve, reject);
  }
  then(fn) {
    this.resolveChain.push(fn);
    if (this.isResolved) {
      this.resolveChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.resolvedData);
    }
    return this;
  }

  catch(fn) {
    this.rejectedChain.push(fn);
    if (this.isRejected) {
      this.rejectedChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.rejctedData);
    }
    return this;
  }

  finally(fn) {
    this.rejectedChain.push(fn);
    this.resolveChain.push(fn);
    if (this.isResolved) {
      this.resolveChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.resolvedData);
    }
    if (this.isRejected) {
      this.rejectedChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.rejctedData);
    }
  }
}

// for directly accessing resolve without creating object of class , rejetc, and Promise.resolve() , reject()  and all()

class MyPromise3 {
  resolvedData;
  isResolved = false;
  resolveChain = [];

  rejctedData;
  isRejected = false;
  rejectedChain = [];

  static resolve(value) {
    // for resolve()
    return new MyPromise3((resolve) => resolve(value));
  }

  static reject(value) {
    // for reject()
    return new MyPromise3((_resolve, reject) => reject(value));
  }
  static all(promises) {
    const fulfilled = [];
    const results = [];
    return new MyPromise3((resolve, reject) => {
      promises
        .forEach((promise, index) =>
          promise.then((data) => {
            fulfilled.push(true);
            results[index] = data;

            if (fulfilled.length === promises.length) resolve(results);
          })
        )
        .catch((error) => {
          this.reject(error);
        });
    });
  }

  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;

      if (this.resolveChain.length)
        // to handle sync scenario,because in those ones thenFunction would not have any context as then was not run
        this.resolveChain.reduce((acc, fn) => {
          return fn(acc);
        }, this.resolvedData);
    };

    const reject = (value) => {
      this.rejctedData = value;
      this.isRejected = true;
      if (this.rejectedChain.length) {
        this.rejectedChain.reduce((acc, fn) => fn(acc), this.rejctedData);
      }
    };
    executor(resolve, reject);
  }
  then(fn) {
    this.resolveChain.push(fn);
    if (this.isResolved) {
      this.resolveChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.resolvedData);
    }
    return this;
  }

  catch(fn) {
    this.rejectedChain.push(fn);
    if (this.isRejected) {
      this.rejectedChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.rejctedData);
    }
    return this;
  }

  finally(fn) {
    this.rejectedChain.push(fn);
    this.resolveChain.push(fn);
    if (this.isResolved) {
      this.resolveChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.resolvedData);
    }
    if (this.isRejected) {
      this.rejectedChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.rejctedData);
    }
  }
}

//

function logger1() {
  console.log("logger1");

  Promise.resolve().then(() => {
    console.log("promise logger 1");
  });
}

function logger2() {
  console.log("logger 2");

  setTimeout(() => {
    console.log("setTimeout logger 2");
  }, 0);
}

function logger3() {
  console.log("logger 3");

  Promise.resolve().then(() => {
    console.log("promise logger 3");
  });
}

logger1();
logger2();
logger3();

/*
logger1
logger 2
logger 3
promise logger 1
promise logger 3
undefined
setTimeout logger 2
*/
