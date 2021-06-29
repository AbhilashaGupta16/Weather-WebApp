const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs")

app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");
});


app.post("/",function(req,res){
    const city=req.body.city;

    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=cb0d132afea713910fe1bbf72140135e&units=metric";      
    
    https.get(url,function(response){
        response.on("data",function(data){
            const weather=JSON.parse(data);
            const weatherTemp=weather.main.temp;
            const weatherId=weather.weather[0].icon;
            const wMin= weather.main.temp_min;
            const wMax= weather.main.temp_max;
            const main=weather.weather[0].main;
            const weatherDes=weather.weather[0].description;
            const pressure = weather.main.pressure;
            const humidity = weather.main.humidity;
            const imgno="./images/img-"+weatherId.substring(0,2)+".jpg"
            const imgurl="http://openweathermap.org/img/wn/"+weatherId+"@2x.png";
            res.render("list",{imgno:imgno,cityName:city.toUpperCase(),imgurl:imgurl,temp:weatherTemp, minTemp:wMin,maxTemp:wMax, main:main,desc:weatherDes,pres:pressure,hum:humidity})


        })
    })
    // const img="https://pixabay.com/api/?key=21095815-da64d7d6d8d64d2581c2a795c&q="+city
    // console.log(img)
    // https.get(img,function(response){
    //     response.on("data",function(data){
    //     const wimg=JSON.parse(data);
    //     const imgurl=wimg.hits[0].largeImageURL
    // })
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at 3000");
});