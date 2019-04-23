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
    } else if (request.url === "/static/script.js") {
        fs.readFile('./static/script.js', 'utf8', function (errors, contents) {
            response.writeHead(200, { 'Content-type': 'text/javascript' });
            response.write(contents);
            response.end();
        });
    } else {
        response.end('File not found!!!');
    }
});


// tell your server which port to run on
// const hostname = '127.0.0.1';
const hostname = '10.250.207.122';
const port = 6789;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
// print to terminal window
console.log("Running in localhost at port 6789");
