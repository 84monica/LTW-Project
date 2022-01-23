const http = require('http');
const fs = require('fs');
const url = require('url');

const headers = {
    plain: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    },
    sse: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    }
};

const server = http.createServer(function (request, response) {
    const parsedUrl = url.parse(request.url, true);
    const pathName = parsedUrl.pathname;
    let answer = { status: 200, data: {}};

    switch (pathName) {
        // REGISTER FUNCTION
        case '/register':
            let body = '';
            request.on('data', function (chunk) { body += chunk; });
            request.on('end', function () {
                try {
                    let data = JSON.parse(body);
                    // call function to write data in file
                    answer.status = register(data.nick, data.password);
                }
                catch (error) {
                    console.log(error.message);
                    answer.status = 400;
                }
            });
            request.on('error', (error) => { console.log(error.message); answer.status = 400; })
            break;
        // RANKING FUNCTION
        case '/ranking':
            answer.status = 200;
            answer.data = JSON.parse(fs.readFileSync('ranking.json'));
            break;
        default:
            answer.status = 404;
            break;
    }
    
    response.writeHead(answer.status, headers['plain']);
    response.end(JSON.stringify(answer.data));
});

server.listen(9037);

function register(nick, password) {
    let users = [];
    let new_data = { nick: nick, password: password };
    let status = 200;

    if (nick === undefined || password === undefined) {
        status = 400;
    }

    fs.readFile('./users.json', function (error, data) {
        if (error) {              // File doesn't exist
            users.push(new_data);
            // creates file
            fs.writeFile('./users.json', JSON.stringify(users), (error) => {
                if (error) throw error;
            });
        } else {                // File exists
            users = JSON.parse(data.toString());
            // verifies if user is in file
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                if (user.nick === nick) {
                    // verifies password
                    if (user.password === password) {
                        return 200;
                    // if password is incorrect return error
                    } else {
                        return 401;
                    }
                }
            }
            users.push(new_data);
            fs.writeFile('./users.json', JSON.stringify(users), (error) => {
                if (error) throw error;
            });
        }
    });

    return status;
}

// http://twserver.alunos.dcc.fc.up.pt:9037/