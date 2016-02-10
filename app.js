var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts')
var http = require('http')

app.set('views', './views') //Tells you where our Views files cab be held.
app.set('view engine', 'ejs')//Tells app that we are going to set the view engine ejs

app.use(expressLayouts); //Tells the app to use the expressLayouts set above
app.use(express.static('public')); //tells the App where to find your static files such as CSS



//This is 
app.get('/weather', function(req, res){
  res.render('weather');
})


app.get('/weather/:location', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/weather?q=' + request.params.location + '&units=metric&appid=ff74949fda216ea456defe777765a4b9', function(res){
    var body = "";
    res.on('data', function(d){
      body += d;
    res.on('end', function(){
      var weather = JSON.parse(body);
      response.send(weather);
    })
    })
  })
})

app.get('/weather/fiveday/:location', function(request, response){
  http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + request.params.location + ',us&mode=xml&appid=ff74949fda216ea456defe777765a4b9', function(res){

    var body = "";
    res.on('data', function(d){
      body += d;
    res.on('end', function(){
      var weather = JSON.parse(body);
      console.log( weather);
      response.send(weather);
    })
    })
  })
})

app.listen('3000', function(){
  console.log('serving on port 3000')
})
