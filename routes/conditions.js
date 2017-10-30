const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex');
const queries = require('../db/queries');

const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditionsQuery = '/conditions/q/';

let url = apiWeather + apiKeyWeather + conditionsQuery;

router.get('/', (req, res, next) => {
  knex('locations')
  .then(locations => {
    res.render('conditions', {locations});
  })
  .catch(err => {
    next(err);
  })
})

router.post('/', (req, res, next) => {
  const{ city, state } = req.body;
  request(url + state + '/' + city + '.json', (error, response, body) => {
    let resBody = JSON.parse(body);
    let cityTemp = Number.parseInt(resBody.current_observation.temp_f);
    let currentWeather = resBody.current_observation.weather;

    knex('locations')
    .insert({
      city: city,
      state: state,
      temp: cityTemp,
      weather: currentWeather
    })
    .then(() => {
      res.redirect('/');
    })
  })
})



module.exports = router;
