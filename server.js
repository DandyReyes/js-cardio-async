// Get the http module
const http = require('http');
// Get the server object
const server = http.createServer();
// Get router.js file
const handleRoutes = require('./router');

// listens for the "request" event on server when
// client makes a request
// Request = What the client asks for
// Response = What we send the client
server.on('request', (request, response) => {
  handleRoutes(request, response);
});

/** Accept incoming connections
 * Stay above 3000 for ports
 * First argument is the port you want it to listen on
 */
server.listen(5000, () => console.log('server listening on port 5000'));
