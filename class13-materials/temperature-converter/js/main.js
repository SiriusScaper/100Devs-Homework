//Write your pseduo code first! 

// 0 => 32
document.querySelector('#convertC').addEventListener('click', celsius)
function celsius() {
  // Grab a number input
  const tempC = document.querySelector('#tempCToF').value
  // Convert from celsius to fahrenheit
  let tempF = (tempC * 9/5) + 32;
  // show it in the browser
  document.querySelector('#outputF').innerText = tempF
}

// 32 => 0
document.querySelector('#convertF').addEventListener('click', fahrenheit)

function fahrenheit() {
  // Grab a number input
  const tempF = document.querySelector('#tempFToC').value
  // Convert from fahrenheit to celsius
  let tempC = (tempF - 32) * 5/9;
  // show it in the browser
  document.querySelector('#outputC').innerText = tempC
}