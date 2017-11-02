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

let host = "192.168.0.7",
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

let weatherVal = "thunderstorm";

// --------------------------
// Set light state -- .white('warm white value', 'brightness %')
let lightState = hue.lightState;



// Set light states for different temperature conditions
let tempState;

let coldState = lightState.create().on().shortAlert().rgb(26, 26, 255);
let mildState = lightState.create().on().shortAlert().rgb(43, 255, 246).brightness(100);
let hotState = lightState.create().on().shortAlert().rgb(255, 67, 30);


// Set light states for different temperature conditions
let weatherState;

let clearState =  lightState.create().on().shortAlert().rgb(213, 251, 255);
let rainState = lightState.create().on().shortAlert().rgb(71, 95, 118);
let snowState = lightState.create().on().shortAlert().rgb(239, 244, 255);
let fogState = lightState.create().on().shortAlert().rgb(162, 166, 173);
let thunderstormState = lightState.create().on().shortAlert().rgb(242, 212, 72);
let cloudState = lightState.create().on().shortAlert().rgb(164, 164, 193);
let miscState = lightState.create().on().shortAlert().rgb(204, 45, 235);

if (weatherVal === "clear") {
  weatherState = clearState;
}

if (weatherVal === "thunderstorm") {
  weatherState = thunderstormState;
}


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


app.get('/users/:id/color', (req, res, next) => {
  const id = req.params.id;
  knex('weatherlog')
    .where('user_id', id)
    .then(data => {
      let lastIndex = data.length - 1;
      console.log('TEMPERATURE IS: ' + data[lastIndex].temp);
      let tempVal = Number.parseInt(data[lastIndex].temp);
      // if (tempVal < 32) {
      //   tempState = coldState;
      // }
      //
      // if (tempVal > 32 && tempVal <= 65) {
      //   tempState = mildState;
      //   console.log('mild');
      // }
      //
      // if (tempVal > 65) {
      //   tempState = hotState;
      // }

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




const conditions = require('./routes/conditions');
app.use('/', conditions);

const users = require('./routes/users');
app.use('/', users);

const lights = require('./routes/lights');
app.use('/', lights);

const queries = require('./db/queries');




app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});
