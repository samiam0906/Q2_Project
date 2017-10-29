const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const request = require('request');

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile.js')[environment];
const knex = require('knex')(knexConfig);

app.use(express.static('public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditions = '/conditions/q/';

// let cityQuery = 'New_York';
// let stateQuery = 'NY';
// // const location_url  = stateQuery + '/' + cityQuery + '.json'
let url = apiWeather + apiKeyWeather + conditions;

app.get('/users', (req, res, next) => {
  // request(url, (error, response, body) => {
  //   let res = JSON.parse(body);
  //   let temp = res.current_observation.temp_f;
  //
  //
  // })
  knex('locations')
  .then(locations => {
    res.render('users', {locations});
  })
  .catch(err => {
    next(err);
  })
})

app.get('/colors', (req, res, next) => {
  res.render('pages/index');
})

app.post('/users', (req, res, next) => {
  const { city, state } = req.body;
  console.log(req.body);
  let cityTemp;
  request(url + state + '/' + city + '.json', (error, response, body) => {
    let res = JSON.parse(body);
    let cityTemp = res.current_observation.temp_f;
    console.log(cityTemp);
  })
  knex('locations')
  .insert({
    city: city,
    state: state,
    temp: cityTemp
  })
  .then(() => {
    res.redirect('/users');
  })
  .catch(err => {
    next(err);
  })
})

// get city temperatures
// app.get('/temp', (req, res, next) => {
//
//   request(url, (error, response, body) => {
//     let res = JSON.parse(body);
//     let temp = res.current_observation.temp_f;
//     res.render('temp', {temp})
//   })
// })




app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});
