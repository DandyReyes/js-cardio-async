// This provides functionality for using urls
const url = require('url');
// Bring in the controller
/*
const controller = require('./controller');
// you would have to do this long winded variable naming
const getStatus = controller.getStatus;
const getPatch = controller.getPatch;
// Destructure the controller variable
// {getPatch: blah} means you get the getPatch variable but then changes name to blah
const { getHome, getPatch, getStatus } = controller;
*/
// OR a shorthand version
const { getHome, patchSet, getStatus } = require('./controller');
// Import the db js file
const db = require('./db');

const handleRoutes = (request, response) => {
  // Listen for request, "/" is for the home page
  if (request.url === '/' && request.method === 'GET') {
    return getHome(request, response);
  }

  // Listen if the client asks for /status path
  if (request.url === '/status' && request.method === 'GET') {
    return getStatus(request, response);
  }

  // parse our url so it doesn't have the query added to it
  const parsedURL = url.parse(request.url, true);
  // TIP: you can always console.log your url if you're stuck
  console.log(parsedURL);
  // if you pass this onto the url then you will get the inside of the if function
  if (parsedURL.pathname === '/set' && request.method === 'PATCH') {
    return patchSet(request, response, db, parsedURL.query);
  }
};

module.exports = handleRoutes;
