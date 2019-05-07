var http = require('http');
var express = require("express");
var fs = require('fs');
var app = express();
app.use(express.static('public'));
app.use(express.static(__dirname + "/static"));

var server = http.createServer(function (request, response) {
    console.log('client request URL: ', request.url);
    if (request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    } else if (request.url === '/presentation') {
        fs.readFile('presentation.html', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    } else if (request.url.match(/\.css$/)) {
        fs.readFile("." + request.url, 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'text/css' });
            response.write(contents);
            response.end();
        });
    } else if (request.url.match(/\.js$/)) {
        fs.readFile("." + request.url, 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'text/javascript' });
            response.write(contents);
            response.end();
        });
    }else if (request.url.match(/\.jpg$/)) {
        console.log("Image")
        fs.readFile("." + request.url, function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'image/jpg' });
            response.write(contents);
            response.end();
        });
    } 
    else {
        response.end('File not found!!!');
    }
});


server.listen(6789)
console.log("Running in localhost at port http://localhost:6789");
