document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#personName").textContent = data.name
  document.querySelector("#personStatus").textContent = data.status
  document.querySelector("#personOccupation").textContent = data.currentOccupation
}

document.querySelector('#flipMe').addEventListener('click', makeReq2)

async function makeReq2(){

  const flip = document.querySelector("#flipMe").value;
  const res = await fetch(`/api2?=${flip}`)
  const data = await res.text()

  console.log(data);
  document.querySelector("#flipResult").textContent = data.flipResult
}