// *Variables*
// Create a variable and console log the value
let firstName = 'Rhys'
// Create a variable, add 10 to it, and alert the value
let age = 2
age += 10
alert(age)
// *Functions*
// Create a function that subtracts 4 numbers and alerts the difference
function substraction(num1, num2, num3, num4) {
  let diff = num1 - num2 - num3 - num4;
  alert(diff)
}

substraction(16, 10, 4, 2)
// Create a function that divides one number by another and returns the remainder
function remainder(num1, num2){
  return num1 % num2
}

console.log(remainder(9, 8));
// Conditionals
// Create a function that adds two numbers and if the sum is greater than 50 alert Jumanji
function jumanji(num1, num2) {
  let sum = num1 + num2
  if (sum > 50) {
    alert('Jumanji')
  }  
}
// Create a function that multiplys three numbers and if the product is divisible by 3 alert ZEBRA
function multiplication(num1, num2, num3){
  let product = num1 * num2 * num3
  if (product % 3 === 0){
    alert('ZEBRA')
  }
}

console.log(multiplication(3, 3, 3));