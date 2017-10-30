const express = require('express');
const router = express.Router();
const request = require('request');
const knex = require('../db/knex');
const queries = require('../db/queries');


const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditionsQuery = '/conditions/q/';

// let cityQuery = 'New_York';
// let stateQuery = 'NY';
// // const location_url  = stateQuery + '/' + cityQuery + '.json'
let url = apiWeather + apiKeyWeather + conditionsQuery;

router.get('/conditions', (req, res, next) => {
  // res.status(200).json({ message: 'Connected!' });



  knex('locations')
  .then(locations => {
    res.render('conditions', {locations});
  })
  .catch(err => {
    next(err);
  })
})

router.post('/conditions', (req, res, next) => {
  request(url + 'GA' + '/' + 'Atlanta' + '.json', (error, response, body) => {
    let resBody = JSON.parse(body);
    let cityTemp = Number.parseInt(resBody.current_observation.temp_f);
    const{ city, state } = req.body;
    knex('locations')
    .insert({
      city: city,
      state: state,
      temp: cityTemp
    })
    .then(() => {
      res.redirect('/conditions');
    })
  })
})



module.exports = router;
