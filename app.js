var express = require("express");
var app     = express();
var request = require("request");

app.set("view engine", "ejs")
app.use(express.static('public'));

app.get("/", function(req, res){
    res.render("index");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb&";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("cards/cards", {data: data});
        }
    });
});

app.get("/infos", function(req, res){
    var id = req.query.id;
    var url = "http://www.omdbapi.com/?i=" + id + "&apikey=thewdb&";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.send(data);
        }
    });
});

app.listen(3000, function(req, res){
    console.log("Server has started on port 3000");
});

/* Docs       --> http://www.omdbapi.com/*/
/* (s) search --> http://www.omdbapi.com/?s=star&apikey=thewdb& */
/* (i) ID     --> http://www.omdbapi.com/?i=tt3896198&apikey=thewdb */
/* (t) title  --> http://www.omdbapi.com/?t=superbad&apikey=thewdb */
