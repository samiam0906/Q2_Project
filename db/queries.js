const knex = require('./knex');
const request = require('request');

const apiWeather = 'http://api.wunderground.com/api/';
const apiKeyWeather = 'd8cca433e1c32193';
const conditionsQuery = '/conditions/q/';

let url = apiWeather + apiKeyWeather + conditionsQuery;
