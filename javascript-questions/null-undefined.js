// There are only six falsey values in JavaScript: undefined, null, NaN, 0, "" (empty string), and false of course.
var string = ""; // <-- falsy

var filledString = "some string in here"; // <-- truthy

var zero = 0; // <-- falsy

var numberGreaterThanZero; // <-- truthy

var emptyArray = []; // <-- truthy, we'll explore more about this next

var emptyObject = {}; // <-- truthy

if ([] == false)
  if ([])
    // <-- truthy, will run code in if-block

    if ([] == true)
      // <-- truthy, will also run code in if-block

      if (![])
        // <-- falsy, will NOT run code in if-block

        // <-- falsy, will also NOT run code in if-block

        // primitive data types- is data that is not an object and has no methods: string, number, bigint,boolean,undefined,symbol and null.
        // All primitives are immutable

  // Using a string method doesn't mutate the string - strings are immutable :
  /*
  They are immutable. You cannot change a character within a string with something like var myString = "abbdef"; myString[2] = 'c'. The string manipulation methods such as trim, slice return new strings.

In the same way, if you have two references to the same string, modifying one doesn't affect the other
  */

let a = b = "hello";
a = a + " world";
// b is not affected

        var bar = "baz";
console.log(bar); // baz
bar.toUpperCase();
console.log(bar); // baz

// Using an array method mutates the array
var foo = [];
console.log(foo); // []
foo.push("plugh");
console.log(foo); // ["plugh"]

// Assignment gives the primitive a new (not a mutated) value
bar = bar.toUpperCase(); // BAZ

/*
In JavaScript, undefined means a variable has been declared but has not yet been assigned a value. 
In JavaScript, NULL is an assignment value. It can be assigned to a variable as a representation of no value.
*/

let x;
console.log(x); //undefined
console.log(typeof x); //undefined

let y = null;
console.log(y); //null
console.log(typeof y); //object

console.log(nul == undefined); //true
console.log(null === undefined); //false
