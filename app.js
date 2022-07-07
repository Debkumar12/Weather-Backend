const express= require("express");
const https=require("https");
const bodyParser= require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function name(req,res) {
 res.sendFile(__dirname+"/index.html");
})

app.post("/",function (req,res) {
const city=req.body.cityName;

const query=city;
    const unit="metric"
    const apikey="4735b615af7d19e0caf443f9f05129c";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "5&units=" + unit + "";
    https.get(url,function (response) {
        console.log(response.statusCode);
        response.on("data",function (data) {
           const weatherdata=  JSON.parse(data);
           const temp=weatherdata.main.temp;
           const des=weatherdata.weather[0].description;
           const iconimg=weatherdata.weather[0].icon;
           const imageURL="http://openweathermap.org/img/wn/" + iconimg+ "@2x.png";
           res.write("<h1> The Tempareture in "+ city + " is --->"+ temp +" Degree</h1>");
           res.write("<p>Weather Condtion : "+ des +"<p>");
           res.write("<img src="+ imageURL +">")
          res.send();
        })
    });;
})

app.listen(3000,function () {
    console.log("The weather app is running");
})