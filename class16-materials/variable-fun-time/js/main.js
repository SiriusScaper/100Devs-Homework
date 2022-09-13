//--- Easy
//create a variable and assign it a number
let number = 1
//minus 10 from that number
number -= 10
//print that number to the console
console.log(number);
//--- Medium
//create a variable that holds a value from the input
//add 25 to that number
// valueOfInput += 25
// //alert that number
// alert(valueOfInput)
//--- Hard
//create a variable that holds the h1
let clickMe = document.querySelector('h1')
//add an event listener to that element that console logs the sum of the two previous variables

clickMe.addEventListener('click', sum)

function sum () {
  let valueOfInput = document.querySelector('#danceDanceRevolution').value
  console.log(number + Number(valueOfInput))
}
