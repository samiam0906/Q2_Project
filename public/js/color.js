$(document).ready(function() {
  $('select').material_select();
});


// // ----------------------------------
// // Create and insert color picker
//
// // $(".basic").spectrum({
// //     color: "#f00",
// //     change: function(color) {
// //         $("#basic-log").text("change called: " + color.toHexString());
// //     }
// // });
//
// $(".colorPicker").spectrum({
//   color: "#FFFFFF",
//   showInput: true,
//   className: "full-spectrum",
//   showInitial: true,
//   showPalette: true,
//   showPaletteOnly: true,
//   showSelectionPalette: true,
//   togglePaletteOnly: true,
//   togglePaletteMoreText: 'more',
//   togglePaletteLessText: 'less',
//   maxSelectionSize: 10,
//   preferredFormat: "hex",
//   localStorageKey: "spectrum.demo",
//   move: function(color) {
//
//   },
//   show: function() {
//
//   },
//   beforeShow: function() {
//
//   },
//   hide: function() {
//
//   },
//   change: function(color) {
//     // let tempElements = document.getElementsByClassName('tempCondition');
//     //
//     // Array.prototype.forEach.call(tempElements, element => {
//     //   let tempValue = Number.parseInt(element.innerHTML);
//     //
//     //   switch (true) {
//     //     case (tempValue > 0 && tempValue <= 32):
//     //       element.style.backgroundColor = color;
//     //       break;
//     //     case (tempValue > 32 && tempValue <= 65):
//     //       element.style.backgroundColor = color;
//     //       break;
//     //     case (tempValue > 65):
//     //       element.style.backgroundColor = color;
//     //       break;
//     //     default:
//     //       console.log("no temperature specified")
//     //   }
//     // })
//
//   },
//   palette: [
//     ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
//       "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"
//     ],
//     ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
//       "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"
//     ],
//     ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
//       "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
//       "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
//       "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
//       "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
//       "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
//       "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
//       "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
//       "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
//       "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"
//     ]
//   ]
// });
//
//
// $('.colorPicker').on('change.spectrum', function(e, tinycolor) {
//   let colorSelection = $(".colorPicker").spectrum("get").toHex();
//   console.log(colorSelection);
// });


// ----------------------------------
// Change color depending on temperature value
let coldColor = "rgb(26, 26, 255)";
let mildColor = "rgb(43, 255, 246)";
let hotColor = "rgb(255, 67, 30)";


let tempElements = document.getElementsByClassName('tempCondition');

Array.prototype.forEach.call(tempElements, element => {
  let tempValue = Number.parseInt(element.innerHTML);

  switch (true) {
    case (tempValue <= 32):
      element.style.backgroundColor = coldColor;
      break;
    case (tempValue > 32 && tempValue <= 65):
      element.style.backgroundColor = mildColor;
      break;
    case (tempValue > 65):
      element.style.backgroundColor = hotColor;
      break;
    default:
      console.log("no temperature recorded")
  }
})

// ----------------------------------
// Change color depending on weather conditions

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

let clearColor = "rgb(213, 251, 255)";
let rainColor = "rgb(71, 95, 118)";
let snowColor = "rgb(239, 244, 255)";
let fogColor = "rgb(162, 166, 173)";
let thunderstormColor = "rgb(242, 212, 72)";
let cloudColor = "rgb(164, 193, 191)";
let miscColor = "rgb(204, 45, 235)";

let weatherElements = document.getElementsByClassName('currentWeather');

Array.prototype.forEach.call(weatherElements, element => {
  let weatherValue = element.innerText;

  switch (true) {
    case (clearConditions.indexOf(weatherValue) > -1):
      element.style.backgroundColor = clearColor;
      break;
    case (rainConditions1.indexOf(weatherValue) > -1):
      element.style.backgroundColor = rainColor;
      break;
    case (rainConditions2.indexOf(weatherValue) > -1):
      element.style.backgroundColor = rainColor;
      break;
    case (snowConditions1.indexOf(weatherValue) > -1):
      element.style.backgroundColor = snowColor;
      break;
    case (snowConditions2.indexOf(weatherValue) > -1):
      element.style.backgroundColor = snowColor;
      break;
    case (fogConditions.indexOf(weatherValue) > -1):
      element.style.backgroundColor = fogColor;
      break;
    case (thunderstormConditions.indexOf(weatherValue) > -1):
      element.style.backgroundColor = thunderstormColor;
      break;
    case (cloudConditions.indexOf(weatherValue) > -1):
      element.style.backgroundColor = cloudColor;
      break;
    case (miscConditions1.indexOf(weatherValue) > -1):
      element.style.backgroundColor = miscColor;
      break;
    case (miscConditions2.indexOf(weatherValue) > -1):
      element.style.backgroundColor = miscColor;
      break;
    default:
      console.log("no weather recorded")
  }
})
