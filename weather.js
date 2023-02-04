// const express = require("express");
// const https = require("https");
// const bodyParser=require("body-Parser");
// const app = express();
// app.use(bodyParser.urlencoded({extended:true}));
// app.get("/",function(req, res){
// res.sendFile(__dirname+"/weather.html");
// })
// app.post("/",function(req,res) {
//   console.log(req.body.cityName);
// })
// app.listen(3000,function() {
//   console.log("your server is 3000");
// })


const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser");

// native node https module so we don't have to install this module as its already
// installed by defalut

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
/* syntax
const https = require('node:https');

https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});*/
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/weather.html");
})
app.post("/", function(req, res) {
  //console.log("post request received");
  // instead of the above console we will console exact data what we want by using
  //console.log(req.body.cityName);
  //after assigning query value we'll delete the console.log

  const query=req.body.cityName;
  const apiKey="4bb66fdd65b08c2a360ff0816844cb8a";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+ unit +"&appid="+ apiKey+ "&mode=json"
  // As the url was long  so we kept this url as a const and we bypass this url const instead of address in http get(syntax)
  https.get(url, function(response) {
    // as we want only response form the above url so we wrote just request
    //instead of writhing both req,res  as we already mentioned res
    // above in call back fn that's why we'll write here response in this fn

    console.log(response.statusCode);
    // response will be printied in hyper terminal

    response.on("data", function(data) {
      // instead of data we can write any moments that we want in response
      //console.log(data);
      //it will console hexadecimal number 200 like below:-
      //<Buffer 7b 22 63 6f 6f 72 64 22 3a 7b 22 6c 6f 6e 22 3a 38 34
      // so we will convert this hexacode into json using the syntax json.parse(data)
      // and keep this JSON data in a const;
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      /* result  data
    coord: { lon: 84, lat: 28 },
  weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' } ],
  base: 'stations',
  main: {
    temp: 26.32,*/
/*const object={
  name:"raj",
  favouriteFood:"potatofry",

}
console.log(stringify(object));
stringify(data) make all object data as string

*/
       const temp = weatherData.main.temp
      //console.log(temp);
      const weatherDescription = weatherData.weather[0].description

      //console.log(weatherDescription);

      const icon = weatherData.weather[0].icon
      const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
      //res.send("<h1>The temperature in russia is "+temp+" degree celsius<\h1>");
      // the above response is for single response

      // for multiple response we'll use res.write mode

      res.write("<h1> The temperature in "+query+" is" + temp + "degree celsius</h1>");
      res.write("<p> the weather condition in "+query+" is " + weatherDescription + "</p>");
      res.write("<img src=" + imageURL + ">")
      res.send();

      // above three lines code is multiple response to the server



      // in js we can't send two res at a same time so we'll be deleting the rest

    })
  })

})



  //*res.send("jay ma saraswasti please give me fruitful result of my labour i will always go on right path will help the needy people please bless me i can not do anything without your blessing maa since my childhood your blessed me with a lot a knowledge and i am really thankful for all your blessing and i need more your blessings so I can get more knowledge and establish myself in this world so i can help those who really need me for now I and my family praying for my good time kindly bless me so I can do my best and labour hard and i can success in everyfield bless me maa");



app.listen(3000, function() {
  console.log("server is running on port 3000.");
})
