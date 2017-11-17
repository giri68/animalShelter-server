'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
const dataCat = [{
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  gender: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
}, 
{
  imageURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpJ2ixV2-TK4D5b_2DpPrLZxGWoJCybvZW3VXDL_mB2YuT_Dzf',
  imageDescription: 'Sad orange kitty.',
  name: 'Sadness',
  gender: 'Female',
  age: 5,
  breed: 'Short-Hair',
  story: 'Thrown on the street'
}];

const dataDog = [{
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  gender: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
}, 
{
  imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjMNr3mhGFQHvdBsjKnDxiWKGIbji-K3Q3vd8ZMf93Ad5Gbry',
  imageDescription: 'A sad beagle.',
  name: 'Bagel',
  gender: 'Male',
  age: 6,
  breed: 'Beagle',
  story: 'Is really sad'
}];


app.get('/api/cat', (req, res) => {
    
  return res.json(dataCat[dataCat.length-1]);
});

app.get('/api/dog', (req, res) => {
    
  return res.json(dataDog[dataDog.length-1]);
});

function adopt(array){
  return array.pop();
}

app.delete('/api/cat', (req, res) => {
    
  return res.json(adopt(dataCat));
});

app.delete('/api/dog', (req, res) => {
    
  return res.json(adopt(dataDog));
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
