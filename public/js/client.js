var Weather = function(location){
  this.url = 'http://localhost:3000/weather/' + location;
  this.data;
}

Weather.prototype = {
  get: function(callback){
    var self = this
    var request = new XMLHttpRequest();
    request.open('GET', this.url)
    request.onload = function(){
      self.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}




window.onload = function(){
//All varibales defined
  console.log("This is working")
  var form = document.getElementById("weathersearch");
  var input = document.getElementById("locationInput");
  
  var weatherView = document.getElementById("weatherDisplay")
  var storedLocationView = document.getElementById("storedLocations")

  var weather = JSON.parse( localStorage.getItem('weather') ) || [];

  var displayWeather =function(){

    storedLocationView.innerHTML = ""
    for(spell in weather){
     var data = weather[spell];


     var li = document.createElement("li");
     li.innerHTML = '<h3>' + data.name + '</h3>';
     selectCity = document.createElement('button'); 
     selectCity.id = data.name;
     selectCity.innerText = "Get Forecast"
     storedLocationView.appendChild(li)
     storedLocationView.appendChild(selectCity)

     selectCity.addEventListener("click",function(){
        event.preventDefault();
        var locationFive = "fiveday/" + this.id;
        var weatherFive = new Weather(locationFive);
        weatherFive.get(function(){
          var data = weatherFive.data;
          var displayFive = "<h4>Temp: " + data.main.temp + " C</h4><img src='http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png'><button id='addLocation'>Add to list</button>";

    })//end of event listener function
  })//end of loop
}// end of function
}

displayWeather();

  form.onsubmit = function(event){
    event.preventDefault();
    var location = input.value;
    var currentWeather = new Weather(location);
    console.log("currentWeather=", currentWeather)

      currentWeather.get(function(){
        var data = currentWeather.data;
        var weatherDisplay = "<h4>Temp: " + data.main.temp + " C</h4><img src='http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png'><button id='addLocation'>Add to list</button>";

        weatherView.innerHTML = weatherDisplay;

        document.querySelector("#addLocation").onclick = function(){
            weather.push(data);
            localStorage.setItem('weather', JSON.stringify(weather));
            displayWeather();
        }

        document.querySelector(".getCurrentWeather")

 })

}//end of onsubmit


}//end of window onload