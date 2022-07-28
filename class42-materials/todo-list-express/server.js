// import node module for express
const express = require('express') 
// set a variable to access express functions
const app = express() 
// importing node module for mongodb using the mongoclient
const MongoClient = require('mongodb').MongoClient 
// assigning a port number to a variable
const PORT = 2121 
// importing an environment file for sensitive config information to access the database
require('dotenv').config() 


// assigning db as a variable to call mongodb functionality
let db, 
// assign a variable with the value of the connection key for mongodb that is stored in the env file
    dbConnectionStr = process.env.DB_STRING, 
    // assign a variable to access the specific database for the app
    dbName = 'todo' 

// connect and give the key and default value as parameters
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) 
//after the connection is made do this
    .then(client => { 
        // console log that the connection was successful
        console.log(`Connected to ${dbName} Database`) 
        // reassign db to the parameter with a parameter of dbname to access the database "todo"
        db = client.db(dbName) 
    })
    
// use the express template language ejs as the view engine
app.set('view engine', 'ejs') 
// set the default static file directory as public
app.use(express.static('public')) 
// use urlencoding to simplify route paths using bodyparser
app.use(express.urlencoded({ extended: true })) 
// enable parsing of json using bodyparser
app.use(express.json()) 


//call an asynchronous read function with req/res params at the root path
app.get('/',async (request, response)=>{ 
    // set a variable retrieves the matching collection "todos" and put the result in an array
    const todoItems = await db.collection('todos').find().toArray() 
    // set a variable that counts the objects that match the query of not completed
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
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


// asynchronous function to create a new item and add it to the todos collection
app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

// asynchronous function to update an item as complete in the todos collection in the db
app.put('/markComplete', (request, response) => {
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

// asynchronous function to update an item as uncompleted in the todos collection in the db
app.put('/markUnComplete', (request, response) => {
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

// asynchronous function to delete an item in the todos collection in the db
app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

// start the express server and check for the Port in the env file or default to the variable set
app.listen(process.env.PORT || PORT, ()=>{
    // confirm the sever is running and on what port
    console.log(`Server running on port ${PORT}`)
})