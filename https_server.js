const https = require("https");
const hostname = 'localhost';        //Change to yourdomain.com

const express = require("express");
const app = express();

const fs = require("fs");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {

res.sendFile(__dirname + "/index.html");
});

app.post("/mssg", function (req, res) {

console.log(req.body);

res.redirect("/");
});

const options = {
    key: fs.readFileSync("SSL/server.key"),                  //Change Private Key Path here
    cert: fs.readFileSync("SSL/certificate.crt"),            //Change Main Certificate Path here
    ca: fs.readFileSync('SSL/intermediate.crt'),             //Change Intermediate Certificate Path here
};

https.createServer(options, app)
    .listen(3000, function (req, res) {                        //Change Port Number here (if required, 443 is the standard port for https)
    console.log("Server started at port 3000");                //and here 
});