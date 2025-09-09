What is the difference between var, let, and const?
=>Var- Function-scoped, can be re-declared and updated.Old way of declaring variables, it can cause unexpected issues. Stored as legacy.
Let - Block-scoped, can be updated but not re-declared in the same block.
Const- Also block-scoped, but once you assign a value you can’t reassign it. Great for values that never change.

What is the difference between map(), forEach(), and filter()?
=>forEach() – Just loops through the array and does something with each item. It doesn’t return anything, just executes.
 map() –  it makes a new array where each item change based on your functions.
filter() – It goes through the array and makes a new array but keep only the items that match the condition.

What are arrow functions in ES6?
=>Arrow function introduced in ES6(ECMAScript 2015). A shortcut function => known for short and clean code as well as easier to read.

How does destructuring assignment work in ES6?
=>Template literals introduced in ES6, also called backticks. It allows you to insert variables easily with ${ } instead of using concatenation ‘+’  , \n and other extra hassle.

Explain template literals in ES6. How are they different from string concatenation?
=>Destructuring is a shortcut way to grab values from an array or object and save them into variables without writing extra code.
const {name, age} = {name: “Jhanku”, age: 25}; // name=“Jhanku”, age=25