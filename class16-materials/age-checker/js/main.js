//Create a conditonal that checks their age
//If under 16, tell them they can not drive
//If under 18, tell them they can't hate from outside the club, because they can't even get in
//If under 21, tell them they can not drink
//If under 25, tell them they can not rent cars affordably
//If under 30, tell them they can not rent fancy cars affordably
//If under over 30, tell them there is nothing left to look forward too
let age = document.querySelector('#danceDanceRevolution').value
const ageChecker = (age) => {
  Number(age)
  let message
  if (age < 16) {
    message = "You can't drive"
  } else if (age >= 16 && age < 18){
    message = `Don't hate from outside the club, because you can't even get in`
  } else if (age >= 18 && age < 21) {
    message = `You can't drink!`
  } else if (age >= 21 && age < 25) {
    message = `You can't rent a car affordably`
  } else if (age >= 25 && age < 30) {
    message = `You can't rent fancy cars affordably`
  } else {
    message = `Nothing left in life to look forward to`
  }
  return message
}

//--- Harder
//On click of the h1
//Take the value from the input
//Place the result of the conditional in the paragraph
let clickMe = document.querySelector('h1')
clickMe.addEventListener('click', ageChecker)