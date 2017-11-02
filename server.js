const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const request = require('request');

// const hue = require('./public/js/hue');
const hue = require('node-hue-api')
const HueApi = require("node-hue-api").HueApi;

const knex = require('./db/knex');

app.use(express.static(__dirname + '/public'));

const ejs = require('ejs');
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// --------------------------

let host = "192.168.0.3",
  username = "yFMjdOV63-MM9BDg8HE7abgaRa0J0nO3HsFxbtgX",
  api,
  scheduleId; // need the scheduleId to create a new light schedule

api = new HueApi(host, username);

// --------------------------
// API function that reveals the bridges on a network
let displayBridges = function(bridge) {
  console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

// Using a callback
hue.nupnpSearch(function(err, result) {
  if (err) throw err;
  displayBridges(result);
});


// --------------------------
// Obtain a summary of the configuration of the Bridge
// Below are two functions available to register
// new devices/users with the Hue Bridge

// Using a callback
api.config(function(err, config) {
  if (err) throw err;
  displayResult(config);
});

// using getConfig() alias
// api.getConfig(function(err, config) {
//     if (err) throw err;
//     displayResult(config);
// });


// --------------------------
// Find the lights attached to the bridge
let displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

// Using a callback
api.lights(function(err, lights) {
  if (err) throw err;
  displayResult(lights);
});


// --------------------------
// Search for new lights
let displayResults = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

// Using a callback
api.searchForNewLights(function(err, result) {
  if (err) throw err;
  displayResults(result);
});


// --------------------------
// Obtain newly discovered lights

// Using a callback
api.newLights(function(err, result) {
  if (err) throw err;
  displayResults(result);
});


// --------------------------
// Obtain the defined schedules on the Hue Bridge

// Using a callback
api.schedules(function(err, result) {
  if (err) throw err;
  displayResults(result);
});


// --------------------------
// Obtain details of a schedule

// Using a callback
api.getSchedule(scheduleId, function(err, result) {
  if (err) throw err;
  displayResults(result);
});


//Create a schedule
scheduledEvent = {
  "name": "Sample Schedule",
  "description": "A sample scheduled event to switch on a light",
  "time": "2017-10-27T16:51:00",
  "command": {
    "address": "/api/yFMjdOV63-MM9BDg8HE7abgaRa0J0nO3HsFxbtgX/lights/5/state",
    "method": "PUT",
    "body": {
      "on": true
    }
  }
};

// Using a callback
api.createSchedule(scheduledEvent, function(err, result) {
  if (err) throw err;
  displayResults(result);
});


// --------------------------
// Set light state -- .white('warm white value', 'brightness %')
let lightState = hue.lightState;


// Set light states for different temperature conditions
let tempState;

let coldState = lightState.create().on().shortAlert().rgb(26, 26, 255);
let mildState = lightState.create().on().shortAlert().rgb(255, 0, 0).brightness(100);
let hotState = lightState.create().on().shortAlert().rgb(255, 67, 30);


// Set light states for different temperature conditions
let weatherState;

let clearState = lightState.create().on().shortAlert().rgb(213, 251, 255);
let rainState = lightState.create().on().shortAlert().rgb(71, 95, 118);
let snowState = lightState.create().on().shortAlert().rgb(239, 244, 255);
let fogState = lightState.create().on().shortAlert().rgb(162, 166, 173);
let thunderstormState = lightState.create().on().shortAlert().rgb(242, 212, 72);
let cloudState = lightState.create().on().shortAlert().rgb(164, 164, 193);
let miscState = lightState.create().on().shortAlert().rgb(204, 45, 235);

// Weather Underground Condition Phrases

let clearConditions = [('Clear')];

let rainConditions1 = ['Light Drizzle', 'Heavy Drizzle', 'Drizzle', 'Light Rain', 'Heavy Rain', 'Rain', 'Light Mist', 'Heavy Mist', 'Mist', 'Light Rain Mist', 'Heavy Rain Mist', 'Rain Mist', 'Light Rain Showers', 'Heavy Rain Showers', 'Rain Showers'];

let rainConditions2 = ['Light Freezing Drizzle', 'Heavy Freezing Drizzle', 'Freezing Drizzle', 'Light Freezing Rain', 'Heavy Freezing Rain', 'Freezing Rain', 'Unknown Precipitation'];

let snowConditions1 = ['Light Snow', 'Heavy Snow', 'Snow', 'Light Snow Grains', 'Heavy Snow Grains', 'Snow Grains', 'Light Ice Crystals', 'Heavy Ice Crystals', 'Ice Crystals', 'Light Ice Pellets', 'Heavy Ice Pellets', 'Ice Pellets', 'Light Hail', 'Heavy Hail', 'Hail', 'Light Snow Showers', 'Heavy Snow Showers', 'Snow Showers', 'Light Snow Blowing Snow Mist'];

let snowConditions2 = ['Heavy Snow Blowing Snow Mist', 'Snow Blowing Snow Mist', 'Light Ice Pellet Showers', 'Heavy Ice Pellet Showers', 'Ice Pellet Showers', 'Light Hail Showers', 'Heavy Hail Showers', 'Hail Showers', 'Light Small Hail Showers', 'Heavy Small Hail Showers', 'Small Hail Showers', 'Light Blowing Snow', 'Heavy Blowing Snow', 'Blowing Snow', 'Light Low Drifting Snow', 'Heavy Low Drifting Snow', 'Low Drifting Snow', 'Small Hail'];

let fogConditions = ['Light Fog', 'Heavy Fog', 'Fog', 'Light Fog Patches', 'Heavy Fog Patches', 'Fog Patches', 'Patches of Fog', 'Shallow Fog', 'Partial Fog', 'Light Freezing Fog', 'Heavy Freezing Fog', 'Freezing Fog'];

let thunderstormConditions = ['Light Thunderstorm', 'Heavy Thunderstorm', 'Thunderstorm', 'Light Thunderstorms and Rain', 'Heavy Thunderstorms and Rain', 'Thunderstorms and Rain', 'Light Thunderstorms and Snow', 'Heavy Thunderstorms and Snow', 'Thunderstorms and Snow', 'Light Thunderstorms and Ice Pellets', 'Heavy Thunderstorms and Ice Pellets', 'Thunderstorms and Ice Pellets', 'Light Thunderstorms with Hail', 'Heavy Thunderstorms with Hail', 'Thunderstorms with Hail', 'Light Thunderstorms with Small Hail', 'Heavy Thunderstorms with Small Hail', 'Thunderstorms with Small Hail'];

let cloudConditions = ['Overcast', 'Partly Cloudy', 'Mostly Cloudy', 'Scattered Clouds', 'Funnel Cloud'];

let miscConditions1 = ['Light Smoke', 'Heavy Smoke', 'Smoke', 'Light Volcanic Ash', 'Heavy Volcanic Ash', 'Volcanic Ash', 'Light Widespread Dust', 'Heavy Widespread Dust', 'Widespread Dust', 'Light Sand', 'Heavy Sand', 'Sand', 'Light Haze', 'Heavy Haze', 'Haze', 'Light Spray', 'Heavy Spray', 'Spray', 'Light Dust Whirls'];

let miscConditions2 = ['Heavy Dust Whirls', 'Dust Whirls', 'Light Sandstorm', 'Heavy Sandstorm', 'Sandstorm', 'Light Low Drifting Widespread Dust', 'Heavy Low Drifting Widespread Dust', 'Low Drifting Widespread Dust', 'Light Low Drifting Sand', 'Heavy Low Drifting Sand', 'Low Drifting Sand', 'Light Blowing Widespread Dust', 'Heavy Blowing Widespread Dust', 'Blowing Widespread Dust', 'Light Blowing Sand', 'Heavy Blowing Sand', 'Blowing Sand', 'Squalls', 'Unknown'];


// Turn light off
// api.setLightState(5, tempState, function(err, result) {
//   if (err) throw err;
//   displayResult(result);
// });

// api.setLightState(5, weatherState, function(err, lights) {
//   if (err) throw err;
//   displayResult(lights);
// });
//
// // Turn light off
// api.setLightState(5, weatherState.off(), function(err, result) {
//   if (err) throw err;
//   displayResult(result);
// });


//---------------------------------------
// Change hue light color based on temperature

app.get('/users/:id/huetemp', (req, res, next) => {
  const id = req.params.id;
  knex('weatherlog')
    .where('user_id', id)
    .then(data => {
      let lastIndex = data.length - 1;
      console.log('TEMPERATURE IS: ' + data[lastIndex].temp);
      let tempVal = Number.parseInt(data[lastIndex].temp);

      switch (true) {
        case (tempVal <= 32):
          tempState = coldState;
          console.log('cold');
          break;
        case (tempVal > 32 && tempVal <= 65):
          tempState = mildState;
          console.log('mild');
          break;
        case (tempVal > 65):
          tempState = hotState;
          console.log('hot');
          break;
        default:
          console.log("no temperature recorded")
      }

      // Using a callback -- set light state of light with id '5'
      api.setLightState(5, tempState, function(err, lights) {
        console.log('LIGHTS PLEASE')
        if (err) throw err;
        displayResult(lights);
      })

    })
    .then(() => {
      res.redirect('/users/' + id)
    })
    .catch(err => {
      next(err);
    })
})


//---------------------------------------
// Change hue light color based on weather

app.get('/users/:id/hueweather', (req, res, next) => {
  const id = req.params.id;
  knex('weatherlog')
    .where('user_id', id)
    .then(data => {
      let lastIndex = data.length - 1;
      console.log('WEATHER IS: ' + data[lastIndex].weather);
      let weatherVal = data[lastIndex].weather;

      switch (true) {
        case (clearConditions.indexOf(weatherVal) > -1):
          weatherState = clearState;
          break;
        case (rainConditions1.indexOf(weatherVal) > -1):
          weatherState = rainState;
          break;
        case (rainConditions2.indexOf(weatherVal) > -1):
          weatherState = rainState;
          break;
        case (snowConditions1.indexOf(weatherVal) > -1):
          weatherState = snowState;
          break;
        case (snowConditions2.indexOf(weatherVal) > -1):
          weatherState = snowState;
          break;
        case (fogConditions.indexOf(weatherVal) > -1):
          weatherState = fogState;
          break;
        case (thunderstormConditions.indexOf(weatherVal) > -1):
          weatherState = thunderstormState;
          break;
        case (cloudConditions.indexOf(weatherVal) > -1):
          weatherState = cloudState;
          break;
        case (miscConditions1.indexOf(weatherVal) > -1):
          weatherState = miscState;
          break;
        case (miscConditions2.indexOf(weatherVal) > -1):
          weatherState = miscState;
          break;
        default:
          console.log("no weather recorded")
      }

      // Using a callback -- set light state of light with id '5'
      api.setLightState(5, weatherState, function(err, lights) {
        console.log('LIGHTS PLEASE')
        if (err) throw err;
        displayResult(lights);
      })

    })
    .then(() => {
      res.redirect('/users/' + id)
    })
    .catch(err => {
      next(err);
    })
})




const conditions = require('./routes/conditions');
app.use('/', conditions);

const users = require('./routes/users');
app.use('/', users);

const queries = require('./db/queries');




app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});
