//Write your pseduo code first! 

document.querySelector('#convertC').addEventListener('click', celsius)

function celsius(){
  // grab an input and assign it
  let tempC = document.querySelector('#celsiusToF').value
  // convert from celsius to fahrenheit
  tempC = (tempC * 9/5) + 32;
  //show it in the browser
  document.querySelector('#outputF').innerText = tempC
}
document.querySelector('#convertF').addEventListener('click', fahrenheit)

function fahrenheit(){
  // grab an input and assign it
  let tempF = document.querySelector('#fahrenheitToC').value
  // convert from celsius to fahrenheit
  tempF = (tempF - 32) * 5/9;
  //show it in the browser
  document.querySelector('#outputC').innerText = tempF
}

