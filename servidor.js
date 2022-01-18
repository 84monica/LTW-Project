const http = require('http');
const cors = require('cors');
const fs = require('fs');

let rawdata = fs.readFileSync('ranking.json');

const server = http.createServer(function (request, response) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Content-Type', 'application/json');

    if(request.method === 'POST'){
        if(request.url === '/ranking'){
            response.end(JSON.stringify(JSON.parse(rawdata)));
        }
    }

    response.end();
});

server.listen(8008);