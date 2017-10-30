const knex = require('./knex');
const request = require('request');

const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditionsQuery = '/conditions/q/';
// let cityQuery = 'New_York';
// let stateQuery = 'NY';
// // const location_url  = stateQuery + '/' + cityQuery + '.json'
let url = apiWeather + apiKeyWeather + conditionsQuery;


function getTemp() {
  request(url + 'GA' + '/' + 'Atlanta' + '.json', (error, response, body) => {
    let res = JSON.parse(body);
    let cityTemp = res.current_observation.temp_f;
    console.log(cityTemp);
    return cityTemp;
  })
}






module.exports = {
  getTemp: getTemp
}
