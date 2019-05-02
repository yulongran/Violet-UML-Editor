var http = require('http');
var fs = require('fs');

var server = http.createServer(function (request, response) {
    console.log('client request URL: ', request.url);
    if (request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(contents);
            response.end();
        });
    } else if (request.url === "/static/style.css") {
        fs.readFile('./static/style.css', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'text/css' });
            response.write(contents);
            response.end();
        });
    }  else if (request.url.match(/\.js/) ) {
        fs.readFile("."+request.url, 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'text/javascript' });
            response.write(contents);
            response.end();
        });
    } else {
        response.end('File not found!!!');
    }
});


server.listen(6789)
console.log("Running in localhost at port http://localhost:6789");
