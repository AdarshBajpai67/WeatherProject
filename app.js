const express  = require('express');
const https  = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

    // const url="https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=6b8a88e64ae25659c4a27e93ea9ef6c6"
    // https.get(url, function(response) {
    //     console.log(response.statusCode); 
    //     response.on('data', function(data) {
    //         // console.log(data);
    //         const weadata =JSON.parse(data);
    //         // console.log(weadata);
    //         const temperature = weadata.main.temp;
    //         const weather =weadata.weather[0].description;
    //         console.log(temperature);
    //         // const wedata = JSON.stringify(data);
    //         // console.log(wedata);
    //         const object = {
    //             name: "adarsh",
    //             society: "ncs"
    //         }
    //         // console.log(JSON.stringify(object));
    //         // res.send("thr temp of london is "+ temperature + "</br> The weather is currently "+ weather);
            
    //         const icon = weadata.weather[0].icon;
    //         const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"; 

    //         res.write("<p>The temp of london is "+ temperature+"</p>");
    //         res.write("<p>The weather is currently "+ weather +"</p>");

    //         res.write("<img src=" + imgurl + ">");
    //         res.send();
    //     })
    // })
    // res.send("server up and running");
})

app.post('/', function(req, res) {
    console.log("request received");
    const query= req.body.city;
    const appkey= "6b8a88e64ae25659c4a27e93ea9ef6c6";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey;
    https.get(url, function(response) {
        console.log(response.statusCode); 
        response.on('data', function(data) {
            // console.log(data);
            const weadata =JSON.parse(data);
            // console.log(weadata);
            const temperature = weadata.main.temp;
            const weather =weadata.weather[0].description;
            console.log(temperature);
            // const wedata = JSON.stringify(data);
            // console.log(wedata);
            const object = {
                name: "adarsh",
                society: "ncs"
            }
            // console.log(JSON.stringify(object));
            // res.send("thr temp of london is "+ temperature + "</br> The weather is currently "+ weather);
            
            const icon = weadata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"; 

            res.write("<p>The temp of "+query+" is "+ temperature+"</p>");
            res.write("<p>The weather is currently "+ weather +"</p>");

            res.write("<img src=" + imgurl + ">");
            res.send();
        })
    })
}) 

app.listen(3000,function(){
    console.log('listening on port 3000');
})