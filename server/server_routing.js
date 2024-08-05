var express = require("express");
var app = express();
app.get("/", function(request, response){
    console.log("There is GET request for the homepage!");
    response.send("Here is the GET Method!");
})
app.post("/", function(request, response){
    console.log("A POST request for the homepage is accessed.");
    response.send("Here is the POST Method!");
})
app.get("/list_user", function(request, response){
    console.log("Got a GET request for /list_user");
    response.send("This is Page Listing");
})
app.get("/ab*cd", function(request, response){
    console.log("Got a GET request for /ab*cd");
    response.send("Pattern Match Page");
})
app.get("/student_profile", function(request, response){
    console.log("Got a GET request for /student_profile");
    response.send("Alyanna Cyrelle Kumi Briones, a Web Development student");
})
var server = app.listen(4000, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});