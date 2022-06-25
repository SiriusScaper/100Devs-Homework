document.querySelector('#check').addEventListener('click', check)

function check() {
  
  const day = document.querySelector('#day').value.toLowerCase();
  
  //Conditionals go here
  if (day === 'tuesday' || day === 'thursday'){
    console.log("Class day");
    document.querySelector('#placeToSee').innerText = 'Class day';
  } else if (day === 'saturday' || day === 'sunday') {
    console.log("The weekend")
    document.querySelector('#placeToSee').innerText = 'The weekend';
  } else {
    document.querySelector('#placeToSee').innerText = 'Boring day';
  }
};