const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
app.use(methodOverride('_method')); // So is this!


const actorsRouter = require('./routes/actors')
app.use('/actors', actorsRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`)
});

// const server = http.createServer( async (request, response) => {
//     if (request.url === '/favicon.ico') {
//       // Ignore favicon.ico requests
//       response.writeHead(204, {'Content-Type': 'image/x-icon'});
//       response.end();
//       return;
//     }
//     if(DEBUG) console.log('Request Url:', request.url);
//     switch(request.url) {
//     case '/':
//       myEmitter.emit('event', request.url, 'INFO', 'Root of Server successfully rendered.');
//       response.writeHead(200, { 'Content-Type': 'text/plain' });
//       response.end('Welcome to the DAL.');
//       break;

//     case '/addresses':
//       let theAddresses = await getAddresses();
//       response.writeHead(200, { 'Content-Type': 'application/json' });
//       response.write(JSON.stringify(theAddresses));
//       response.end()
//       break;
//     default:
//       let message = `404 - Content Not Found.`;
//       if(DEBUG) console.log(message);
//       myEmitter.emit('event', request.url, 'ERROR', message);
//       response.writeHead(404, { 'Content-Type': 'text/plain' });
//       response.end('404 - Content Not Found.');
//       break;
//     }


// });

// server.listen(port, () => {
//     console.log(`Server running on port ${port}...`)
// });