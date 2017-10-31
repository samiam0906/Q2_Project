// ----------------------------------
// Get user geolocation
var latitude;
var longitude;

if ("geolocation" in navigator) {
  /* geolocation is available */
} else {
  /* geolocation IS NOT available */
}

function geoFindMe() {
  var output = document.getElementById("out");
  var lat = document.getElementById("lat");
  var long = document.getElementById("long");
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    lat.value = latitude;
    long.value= longitude;
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);

    // let geolocation = {
    //   latitude: latitude,
    //   longitude: longitude
    // };
    //
    // console.log(geolocation);

    // $.ajax({
    //   type: 'POST',
    //   url: 'http://api.wunderground.com/api/d8cca433e1c32193/conditions/q/' + latitude + ',' + longitude + '.json',
    //   data: geolocation,
    //   dataType: 'json',
    //   contentType: 'application/json'
    //   success: function(data) {
    //
    //   }
    // })
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
