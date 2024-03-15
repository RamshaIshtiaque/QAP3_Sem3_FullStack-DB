const http = require('http');

const myEmitter = require('./logEvents');

const port = 3000;

global.DEBUG = true;

const server = http.createServer( async (request, response) => {
    if (request.url === '/favicon.ico') {
      // Ignore favicon.ico requests
      response.writeHead(204, {'Content-Type': 'image/x-icon'});
      response.end();
      return;
    }
    if(DEBUG) console.log('Request Url:', request.url);
    switch(request.url) {
    case '/':
      myEmitter.emit('event', request.url, 'INFO', 'Root of Server successfully rendered.');
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Welcome to the DAL.');
      break;


})

server.listen(port, () => {
    console.log(`Server running on port ${port}...`)
});