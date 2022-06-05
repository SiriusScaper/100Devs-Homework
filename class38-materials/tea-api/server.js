const express = require('express');
const app = express();
const PORT = 8000;


const tea = {
  'earl gray': {
    'type': 'black',
    'origin': 'england',
    'waterTemp': 90,
    'steepTimeSeconds': 180,
    'caffinated': true,
    'flavor': 'awesome'
  },
  'chai': {
    'type': 'black',
    'origin': 'england',
    'waterTemp': 90,
    'steepTimeSeconds': 180,
    'caffinated': true,
    'flavor': 'awesome'
  },
  'roasted green tea': {
    'type': 'green',
    'origin': 'japan',
    'waterTemp': 120,
    'steepTimeSeconds': 400,
    'caffinated': true,
    'flavor': 'perfect'
  },
  'unknown': {
    'type': 'unknown',
    'origin': 'unknown',
    'waterTemp': 0,
    'steepTimeSeconds': 0,
    'caffinated': true,
    'flavor': 'unknown'
  }
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/:name', (req, res) => {
  const teaName = req.params.name.toLowerCase()
  if (tea[teaName]) {
    res.json(tea[teaName])
  } else {
    res.json(tea['unknown'])
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}`)
});
