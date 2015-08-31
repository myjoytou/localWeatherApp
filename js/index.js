window.onload = function() {
  var startPos;
  var lat;
  var lon;
  var APIKEY="2be2c3cf24a1033404b63669f4550c60";
  var geoSuccess = function(position) {
    startPos = position;
    lat = startPos.coords.latitude;
    //console.log("start pos: " + startPos.coords.latitude);
    lon = startPos.coords.longitude;
    
    console.log("lat is: ", lat);
    console.log("lon is: ", lon);
    // calling the weather api's
    $.ajax({
      url: "http://api.wunderground.com/api/19eb1ade3c35dc83/conditions/forecast/alert/q/"+lat+","+lon+".json",
      dataType: "jsonp",
      success: update
    });
  };
  // call back for display
  var update = function(response) {
    //console.log("response is: ", response);
    var image_array = ['http://www.picturesofwinter.net/snowy-mountains-5.jpg', 'http://www.bestphotosworld.com/wp-content/uploads/2012/05/autumn-season-7.jpg','http://orig03.deviantart.net/8194/f/2009/271/c/2/hot_day_in_the_desert_by_sxyfrg.jpg'];
    
    
    $("#city-state").append(response['current_observation']['display_location']['city']+","+response['current_observation']['observation_location']['state']);
    
    $("#weather").append(response['current_observation']['weather']);
    
    $("#wind-speed-wind-direction").append(response['current_observation']['wind_dir']+","+response['current_observation']['wind_kph']+"kph");
    
    $("#weather-image").append('<img src=' + response['current_observation']['icon_url']+' >');
    
    // update the temperation : default in celsius
    var temperature = response['current_observation']['temp_c'];
    console.log(typeof(temperature));
    if (temperature < 20) {
      $('body').css("background", 'url(' + image_array[0] + ') no-repeat center center fixed');
      $('body').css('background-size', 'cover');
    }
    else if (temperature > 20 && temperature < 40) {
      $('body').css('background', 'url(' + image_array[1] + ') no-repeat center center fixed');
      $('body').css('background-size', 'cover');
    }
    else {
      $('body').css('background', 'url(' + image_array[2] + ') no-repeat center center fixed');
      $('body').css('background-size', 'cover');
    }
    $("#temp").append(temperature);
    $("#celcius").css("background-color", "white");
    //$("#fahrenheit").css("background-color", "black");
    
    // showing the celcius temp
    $("#celcius").click(function() {
      $("#celcius").css("background-color", "white");
      $("#fahrenheit").css("background-color", "black");
      $("#temp").empty();
      $("#temp").append(response['current_observation']['temp_c']);
    });
    
    // showing temp in fahrenheit
    $("#fahrenheit").click(function() {
      $("#celcius").css("background-color", "black");
      $("#fahrenheit").css("background-color", "white");
      $("#temp").empty();
      $("#temp").append(response['current_observation']['temp_f']);
    });
  
  }
  
  
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
  //console.log(latitude);
  //console.log(longitude);
};