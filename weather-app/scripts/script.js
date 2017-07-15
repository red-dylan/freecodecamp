$(document).ready(function(){
  var currLat = 0;
  var currLon = 0;
  var currCity = "";
  var wxUnits = "us"; //or si
  //Check for user's lat, lon
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      currLat = position.coords.latitude;
      currLon = position.coords.longitude;
      getCity(currLat, currLon);
      getWx(currLat, currLon, wxUnits);
      //$("#temp").html(weather);
    });
  }
  //function to convert Lat, Lon to City
  function getCity(lat, lon){
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon, function(location){
              currCity = location.results[1].formatted_address
              $("#city").html(currCity);
              })
  }
  //get weather data using darksky.net
  function getWx(lat, lon, units){
    $.getJSON("https://api.darksky.net/forecast/13e3ff6de60404c59bf6c75ac5c99580" + "/" + lat + "," + lon + "?callback=?&exclude=minutely,hourly,daily,alerts,flags&units=" + units, function(wxJSON){
      var skycons = new Skycons({"color": "white"});
      var temp = wxJSON.currently.temperature;
      var sky = wxJSON.currently.summary;
      var wind = wxJSON.currently.windSpeed;
      var skyIcon = wxJSON.currently.icon;
      var backImg = backgroundImg(skyIcon);
      $("body").css("background", "url(" + backImg + ") top left / cover no-repeat");
      $("#temp").html(Math.floor(temp) + "°");
      $("#wxIcon").prop("title", sky);
      if (wxUnits === "us") {
        $("#wind").html(wind.toFixed(1));
      }
      else if (wxUnits === "si") {
        $("#wind").html((wind * 3.6).toFixed(1));
      }
      skycons.set("wxIcon", skyIcon);
      skycons.play();
     
      $("#celsius").click(function() {
        if (wxUnits === "us") {
          wxUnits = "si";
          getWx(currLat, currLon, wxUnits);
          $("#celsius").removeClass("active").addClass("inactive");
          $("#fahrenheit").removeClass("inactive").addClass("active");
          $("#speed").html("KMH");
        }
      });
      $("#fahrenheit").click(function() {
        if (wxUnits === "si") {
          wxUnits = "us";
          getWx(currLat, currLon, wxUnits);
          $("#fahrenheit").removeClass("active").addClass("inactive");
          $("#celsius").removeClass("inactive").addClass("active");
          $("#speed").html("MPH");
        }
      });
        
      
    })
    }
});
function backgroundImg(icon) {
  var imgURL = "";
  switch (icon) {
    case "clear-day":
      imgURL="images/clear-day.jpg";
      break;
    case "clear-night":
      imgURL="images/clear-night.jpg";
      $("a").removeClass("darker").addClass("lighter");
      break;
    case "partly-cloudy-day":
      imgURL="images/partly-cloudy-day.jpg";
      break;
    case "partly-cloudy-night":
      imgURL="images/partly-cloudy-night.jpg";
      $("a").removeClass("darker").addClass("lighter");
      break;
    case "cloudy":
      imgURL="images/cloudy.jpg";
      break;
    case "rain":
      imgURL="images/rain.jpg";
      break;
    case "sleet":
      imgURL="images/sleet.jpg";
      break;
    case "snow":
      imgURL="images/snow.jpg";
      break;
    case "wind":
      imgURL="images/wind.jpg";
      break;
    case "fog":
      imgURL="images/fog.jpg";
      break;
  }
  
    return imgURL;
}
function stopLoad() {
  $("#loader").delay(7000).fadeOut("slow");
}
window.onload = stopLoad;
