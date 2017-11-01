const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex');
const queries = require('../db/queries');

const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditionsQuery = '/conditions/q/';

let url = apiWeather + apiKeyWeather + conditionsQuery;

router.get('/users/:id', (req, res, next) => {
  const id = req.params.id
  knex('users')
  .where('id', id)
  .first()
  .then(user => {
    knex('weatherlog')
    .where('user_id', id)
    .then(weather => {
      res.render('conditions', {user, weather});
    })
  })
  .catch(err => {
    next(err);
  })
})

// create weather instance
router.post('/users/:id/weather', function(req,res,next){
  const id = req.params.id;
  const {lat, long} = req.body;
  console.log("This is the lat: "+ lat);
  console.log("This is the long: "+ long);
  request(url + lat + ',' + long + '.json', (error, response, body) => {
    let resBody = JSON.parse(body);
    let cityTemp = Number.parseInt(resBody.current_observation.temp_f);
    let currentWeather = resBody.current_observation.weather;

    knex('weatherlog')
    .insert({
      user_id: id,
      lat: lat,
      long: long,
      temp: cityTemp,
      weather: currentWeather
    })
    .then(() => {
      res.redirect('/users/' + id);
    })
  })
})



module.exports = router;
