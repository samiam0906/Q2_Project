const hue = require('node-hue-api')
const HueApi = require("node-hue-api").HueApi;

let host = "192.168.0.3",
  username = "yFMjdOV63-MM9BDg8HE7abgaRa0J0nO3HsFxbtgX",
  api,
  scheduleId; // need the scheduleId to create a new light schedule

api = new HueApi(host, username);

// --------------------------
// API function that reveals the bridges on a network
var displayBridges = function(bridge) {
  console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

// Using a promise
// hue.nupnpSearch().then(displayBridges).done();

// Using a callback
hue.nupnpSearch(function(err, result) {
    if (err) throw err;
    displayBridges(result);
});



// --------------------------
// Obtain a summary of the configuration of the Bridge
// Below are two functions available to register
// new devices/users with the Hue Bridge

// Using a promise
// api.config().then(displayResult).done();
// using getConfig() alias
// api.getConfig().then(displayResult).done();

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
var displayResult = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

// Using a promise
// api.lights()
//     .then(displayResult)
//     .done();

// Using a callback
api.lights(function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});



// --------------------------
// Search for new lights
var displayResults = function(result) {
  console.log(JSON.stringify(result, null, 2));
};

// Using a promise
// api.searchForNewLights()
//     .then(displayResults)
//     .done();

// Using a callback
api.searchForNewLights(function(err, result) {
    if (err) throw err;
    displayResults(result);
});



// --------------------------
// Obtain newly discovered lights

// Using a promise
// api.newLights()
//     .then(displayResults)
//     .done();

// --------------------------
// Using a callback
api.newLights(function(err, result) {
    if (err) throw err;
    displayResults(result);
});



// --------------------------
// Obtain the defined schedules on the Hue Bridge

// Using a promise
// api.schedules()
//   .then(displayResults)
//   .done();

// --------------------------
// Using a callback
api.schedules(function(err, result){
    if (err) throw err;
    displayResults(result);
});



// Obtain details of a schedule

// Using a promise
// api.getSchedule(scheduleId)
//   .then(displayResults)
//   .done();

// --------------------------
// Using a callback
api.getSchedule(scheduleId, function(err, result){
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
        "method" : "PUT",
        "body"   : {
            "on": true
        }
    }
};

// --------------------------
// Using a promise
// api.scheduleEvent(scheduledEvent)
//     .then(displayResults)
//     .done();

// --------------------------
// Using a callback
api.createSchedule(scheduledEvent, function(err, result){
    if (err) throw err;
    displayResults(result);
});



// --------------------------
// Set light state -- .white('warm white value', 'brightness %')
var lightState = hue.lightState;

state = lightState.create().on().white(900, 100).shortAlert().colorLoop().transitiontime(20).off();

// Using a promise -- set light state of light with id '5'
// api.setLightState(5, state)
//   .then(displayResult)
//   .done();

// Using a callback -- set light state of light with id '5'
api.setLightState(5, state, function(err, lights) {
  if (err) throw err;
  displayResult(lights);
});


module.exports = hue;