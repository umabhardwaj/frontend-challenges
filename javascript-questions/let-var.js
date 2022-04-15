// 1. var are function scoped and let is block scoped

function run() {
  var foo = "Foo";
  let bar = "Bar";

  console.log(foo, bar); // Foo Bar

  {
    var moo = "Mooo";
    let baz = "Bazz";
    console.log(moo, baz); // Mooo Bazz
  }

  console.log(moo); // Mooo
  console.log(baz); // ReferenceError
}

run();

/* 
  2. Hoisting
While variables declared with var keyword are hoisted (initialized with undefined before the code is run) 
which means they are accessible in their enclosing scope even before they are declared:

let variables are not initialized until their definition is evaluated. Accessing them before the initialization results in a ReferenceError. 
The variable is said to be in "temporal dead zone" from the start of the block until the initialization is processed.

  */

function run2() {
  console.log(foo); // undefined
  var foo = "Foo";
  console.log(foo); // Foo
}

run2();

function checkHoisting() {
  console.log(foo); // ReferenceError
  let foo = "Foo";
  console.log(foo); // Foo
}

checkHoisting();

/*
Creating global object property
At the top level, let, unlike var, does not create a property on the global object:

*/

var foo = "Foo"; // globally scoped
let bar = "Bar"; // not allowed to be globally scoped

console.log(window.foo); // Foo
console.log(window.bar); // undefined
