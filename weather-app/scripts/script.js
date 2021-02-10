$(document).ready(function() {
  let currLat = 0;
  let currLon = 0;
  let currCity = '';
  let currState = '';
  let currCountry = '';
  let wxUnits = 'us'; // or si
  // Check for user's lat, lon
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      currLat = position.coords.latitude;
      currLon = position.coords.longitude;
      console.log(currLat);
      console.log(currLon);
      getCity(currLat, currLon);
      getWx(currLat, currLon, wxUnits);
      // $("#temp").html(weather);
    });
  }
  // function to convert Lat, Lon to City
  function getCity(lat, lon) {
    $.getJSON('https://api.opencagedata.com/geocode/v1/json?q=' + lat + ',' + lon + '&key=fdff99045fa8472c8f854a7dcb17e90a', function(location) {
      console.log(location.results[0].components.city);
      currCity = location.results[0].components.city;
      currState = location.results[0].components.state_code;
      currCountry = location.results[0].components.country;

      if (currCountry === 'United States of America') {
        $('#city').html(currCity + ', ' + currState);
      } else {
        $('#city').html(currCity + ', <br>' + currCountry);
      }
    });
  }
  // get weather data using darksky.net
  function getWx(lat, lon, units) {
    $.getJSON('https://api.darksky.net/forecast/13e3ff6de60404c59bf6c75ac5c99580' + '/' + lat + ',' + lon + '?callback=?&exclude=minutely,hourly,daily,alerts,flags&units=' + units, function(wxJSON) {
      const skycons = new Skycons({color: 'white'});
      const temp = wxJSON.currently.temperature;
      const sky = wxJSON.currently.summary;
      const wind = wxJSON.currently.windSpeed;
      const skyIcon = wxJSON.currently.icon;
      const backImg = backgroundImg(skyIcon);
      $('body').css('background', 'url(' + backImg + ') top left / cover no-repeat');
      $('#temp').html(Math.floor(temp) + '°');
      $('#wxIcon').prop('title', sky);
      if (wxUnits === 'us') {
        $('#wind').html(wind.toFixed(1));
      } else if (wxUnits === 'si') {
        $('#wind').html((wind * 3.6).toFixed(1));
      }
      skycons.set('wxIcon', skyIcon);
      skycons.play();

      $('#celsius').click(function() {
        if (wxUnits === 'us') {
          wxUnits = 'si';
          getWx(currLat, currLon, wxUnits);
          $('#celsius').removeClass('active').addClass('inactive');
          $('#fahrenheit').removeClass('inactive').addClass('active');
          $('#speed').html('KMH');
        }
      });
      $('#fahrenheit').click(function() {
        if (wxUnits === 'si') {
          wxUnits = 'us';
          getWx(currLat, currLon, wxUnits);
          $('#fahrenheit').removeClass('active').addClass('inactive');
          $('#celsius').removeClass('inactive').addClass('active');
          $('#speed').html('MPH');
        }
      });
    });
  }
});
function backgroundImg(icon) {
  let imgURL = '';
  switch (icon) {
    case 'clear-day':
      imgURL = 'images/clear-day.jpg';
      break;
    case 'clear-night':
      imgURL = 'images/clear-night.jpg';
      $('a').removeClass('darker').addClass('lighter');
      break;
    case 'partly-cloudy-day':
      imgURL = 'images/partly-cloudy-day.jpg';
      break;
    case 'partly-cloudy-night':
      imgURL = 'images/partly-cloudy-night.jpg';
      $('a').removeClass('darker').addClass('lighter');
      break;
    case 'cloudy':
      imgURL = 'images/cloudy.jpg';
      break;
    case 'rain':
      imgURL = 'images/rain.jpg';
      break;
    case 'sleet':
      imgURL = 'images/sleet.jpg';
      break;
    case 'snow':
      imgURL = 'images/snow.jpg';
      break;
    case 'wind':
      imgURL = 'images/wind.jpg';
      break;
    case 'fog':
      imgURL = 'images/fog.jpg';
      break;
  }

  return imgURL;
}
function stopLoad() {
  $('#loader').delay(7000).fadeOut('slow');
}
window.onload = stopLoad;
