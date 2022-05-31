const express = require('express');
const bodyParser = require('body-parser');
const { query } = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://sirius:cv5JlBOBvWz4LR5B@cluster0.kfgr4ii.mongodb.net/?retryWrites=true&w=majority'

app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect(connectionString)
.then(client => {
  console.log('Connected to Database')
  
  // Set db variable to the database
  const db = client.db('star-wars-quotes')
  
  // Set quotesCollection to the collection of quotes
  const quotesCollection = db.collection('quotes')
  
  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      {name: 'Yoda'},
      {
        $set: {
          name:req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
      )
      .then(result => {
        res.json('Success')
      })
      .catch(error => console.error(error))
    })
    // Set view engine to ejs 🤮
  app.set('view engine', 'ejs')
   // Use body parser to read from the form element
   app.use(bodyParser.urlencoded({extended: true}))
   // Retrieve the db collection of quotes 
   app.get('/', (req, res) => {
     quotesCollection.find().toArray()
     .then(results => {
       res.render('index.ejs', {quotes: results})
     })
     .catch(error => console.error(error))
   });
   app.post('/quotes', (req, res) => {
     quotesCollection.insertOne(req.body)
     .then(result => {
       res.redirect('/')
     })
     .catch(error => console.error(error))
    });
    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        {name: req.body.name}
      )
      .then(result => {
        if(result.deletedCount === 0){
          return res.json('No more qouotes to delete')
        }
        res.json(`Deleted Darth Vader's quote`)
      })
      .catch(error => console.error(error))
    })
    app.listen(3000, () => {
      console.log('Server started on 3000');
    });
  })
  .catch(error => console.error(error))
