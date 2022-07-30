const express = require('express') // Setting a constant to import express nodemodule and use it
const app = express() // Setting a constant variable to the instance of express
const MongoClient = require('mongodb').MongoClient // Setting a constant variable to access methods from MongoClient and interact with the database
const PORT = 2121 // assigning a port number to a variable of PORT
require('dotenv').config() // importing an environment file for sensitive config information to access the database


let db, // assigning db as a variable to call mongodb functionality
    dbConnectionStr = process.env.DB_STRING, // assign a variable with the value of the connection key for mongodb that is stored in the env file
    dbName = 'todo' // assign a variable to access the specific database for the app

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) // connect and give the key and default value as parameters
    .then(client => { //after the connection is made do this
        console.log(`Connected to ${dbName} Database`) // console log that the connection was successful
        db = client.db(dbName) // reassign db to the parameter with a parameter of dbname to access the database "todo"
    })
    
app.set('view engine', 'ejs') // use the express template language ejs as the view engine
app.use(express.static('public')) // set the default static file directory as public
app.use(express.urlencoded({ extended: true })) // use urlencoding to simplify route paths using bodyparser
app.use(express.json()) // enable parsing of json using bodyparser


app.get('/',async (request, response)=>{ //call an asynchronous read function with req/res params at the root path
    const todoItems = await db.collection('todos').find().toArray() // set a variable retrieves the matching collection "todos" and put the result in an array
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) // set a variable that counts the objects that match the query of not completed
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) 
    
    // Code that does the same as above, but using promise chaining which is less readable than the async/await syntactical sugar
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})


app.post('/addTodo', (request, response) => { // asynchronous function to create a new item and add it to the todos collection
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => { // asynchronous function to update an item as complete in the todos collection in the db
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => { // asynchronous function to update an item as uncompleted in the todos collection in the db
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => { // asynchronous function to delete an item in the todos collection in the db
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{ // start the express server and check for the Port in the env file or default to the variable set
    console.log(`Server running on port ${PORT}`) // confirm the sever is running and on what port
})