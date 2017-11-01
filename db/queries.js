const knex = require('./knex');
const request = require('request');
const hue = require('../public/js/hue');

const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditionsQuery = '/conditions/q/';

let url = apiWeather + apiKeyWeather + conditionsQuery;

let coldTemps = knex('weatherlog').where('temp', '<=', 32);
// console.log(coldTemps);
//
// let mildTemps = knex('weatherlog')
//   .where('temp', '>', 32)
//   .andWhere('temp', '<=', 65)
//   .then(function(rows) {
//     console.log(rows);
//   })


function getMildTemps() {
  return knex('weatherlog').select('temp')
    .where('temp', '>', 32)
    .andWhere('temp', '<=', 65)
    .then(function(temps) {
      // already returns an array you can do other things here
      return temps;
    })
}

let mildTemps = [];

getMildTemps()
  .then(function(temps) {
    // do what you need as well, like send to the frontend using express
    console.log(temps)
    for (var i = 0; i < temps.length; i++) {
      for (var key in temps) {
        console.log(temps[i].key)
      }
    }
    
  })


let hotTemps = knex('weatherlog').where('temp', '>', 65);
// console.log(hotTemps);
