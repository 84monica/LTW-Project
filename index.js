const http = require('http');

// RANKING FUNCTION
const server = http.createServer(function (request, response) {

    const user1 = {
        nick: '123', victories: 272, games: 646
    };
    const user2 = {
        nick: 'abcdefghi', victories: 159, games: 531
    };

    const ranking = [user1, user2];

    response.write("Ola\n", ranking);
    response.end();
});
    
server.listen(8080);

// REGISTER FUNCTION


// http://twserver.alunos.dcc.fc.up.pt:9037/