//making get requests with node https module

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

    const query = req.body.cityName;
    const apiKey = "5cfe8604a672bc7f63e5d41c94fee48b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=" + unit;

    https.get(url, function(response){
      response.on("data",function(data){
        const weatherData  = JSON.parse(data);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const image = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

        res.write("<h1>The weather in "+ query+" is currently " + desc + "</h1>");
        res.write("<p>And the temperatur is "+ temp + " degrees celcius </p>");
        res.write("<img src=" + image +">");
        res.send();
      })
    })

});

app.listen(3000, function(){
  console.log("Server running in 3000");
});



// app.get("/",function(req,res){
//
//   //fetching data from external server
//   const url = "https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=5cfe8604a672bc7f63e5d41c94fee48b&units=metric";
//
//   https.get(url, function(response){
//     console.log(response.statusCode);
//
//     response.on("data", function(data){
//       //this will return hexcode from open weatherproject
//       //console.log(data);
//
//       //instead we could use json object
//       //the parse function will de-String the data
//       const weatherData = JSON.parse(data);
//       console.log(weatherData);
//
//       //search for specific data
//       const temp = weatherData.main.temp;
//       const desc = weatherData.weather[0].description;
//       const icon = weatherData.weather[0].icon;
//       const image = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
//       console.log(temp);
//       console.log(desc);
//
//       //sending data that we've got
//       //res.send("<h1>Temperatur in Berlin is " + temp + " celcius. The weather is currently " + desc + "</h1>");
//
//       //or better with
//
//       res.write("<h1>The weather in Berlin is currently " + desc + "</h1>");
//       res.write("<p>And the temperatur is "+ temp + " degrees celcius </p>");
//       res.write("<img src=" + image +">");
//       res.send();
//       //example for from object to string with stringify
//       /*
//       const object = {
//         name: "Bhirawa",
//         food: "Ramen"
//       }
//       console.log(JSON.stringify(object));*/
//     })
//   })
//
// });
