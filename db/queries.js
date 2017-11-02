const knex = require('./knex');
const request = require('request')

const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditionsQuery = '/conditions/q/';

let url = apiWeather + apiKeyWeather + conditionsQuery;

// let coldTemps = knex('weatherlog').where('temp', '<=', 32);
// console.log(coldTemps);
//
// let mildTemps = knex('weatherlog')
//   .where('temp', '>', 32)
//   .andWhere('temp', '<=', 65)
//   .then(function(rows) {
//     console.log(rows);
//   })


// let mildTemps = [];
//
// function getMildTemps() {
//   return knex('weatherlog').select('temp')
//     .where('temp', '>', 32)
//     .andWhere('temp', '<=', 65)
//     .pluck('temp')
//     .then(temps => {
//       let mildTempArr = Array.from(temps);
//       for (var i = 0; i < mildTempArr.length; i++) {
//         mildTemps.push(mildTempArr[i]);
//       }
//       console.log(mildTemps);
//     })
// }
//
// getMildTemps();



let hotTemps = knex('weatherlog').where('temp', '>', 65);
// console.log(hotTemps);
