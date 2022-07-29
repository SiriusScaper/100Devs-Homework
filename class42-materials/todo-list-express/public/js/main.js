const deleteBtn = document.querySelectorAll('.fa-trash') // Creates and assigns a variable of deleteBtn to any elements that have a class of .fa-trash
const item = document.querySelectorAll('.item span') // Creates and assigns a variable of item to a selection of span tags inside of a parent that has a class of "item"
const itemCompleted = document.querySelectorAll('.item span.completed') // Create and assigns a varibale of itemCompleted to a selection of spans with a class of "completed" inside a parent with a class of "item"

Array.from(deleteBtn).forEach((element)=>{ //Creates a copy of the objects stored in deleteBtn as an array and uses the array method forEach to loop through them 
    element.addEventListener('click', deleteItem) // As the forEach loops through the array it adds an event listener with a property of click to the current element and calls the function deleteItem
}) //closes the loop

Array.from(item).forEach((element)=>{ // Creates a copy of the objects stored in item variable as an array and uses the array method forEach to loop through them
    element.addEventListener('click', markComplete) // As the forEach loops through the array it adds an event listener with a property of click to the current element and calls the function markComplete
}) //closes the loop

Array.from(itemCompleted).forEach((element)=>{ // Creates a copy of the objects stored in the itemCompleted variable as an array and uses the array method forEach to loop through them
    element.addEventListener('click', markUnComplete) // As the forEach loops through the array it adds an event listener with a property of click to the current element and calls the function markUnComplete
}) // closes the loop

async function deleteItem(){ // Declares an asynchronous function called deleteItem
    const itemText = this.parentNode.childNodes[1].innerText // Creates and assigns a variable of itemText to the "this" context to select the text of a childNode element based on the relation to the parentNode in the html
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}