exports.getHome = (request, response) => {
  // First argument is the response port, so "on success"
  // Second argument is an object
  // Sets status code and create new header on response object
  response.writeHead(200, {
    'My-custom-header': 'This is a great API',
  });
  // .write is used to write something before you want to send
  // and end the data (OPTIONAL)
  response.write('Welcome to my server');
  // Writing data to response and then closes
  // Send to client
  response.end();
};

exports.getStatus = (request, response) => {
  const status = {
    up: true,
    owner: 'andrew maney',
    timestamp: Date.now(),
  };
  // Tell postman that the content being passed is JSON
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Another-Header': 'more things',
  });
  // argument needs to come in as a string
  return response.end(JSON.stringify(status));
};

// You can destructure an incoming argument by looking for the values and grabbing them!
exports.patchSet = (request, response, db, { file, key, value }) => {
  // If the db resolves succesfully continue with the promise
  db.set(file, key, value)
    .then(() => {
      // Sends a response
      response.writeHead(200);
      response.end('value set');
    })
    .catch(err => {
      // TODO: handle errors
    });
};

/* Alternate way to export
module.exports = {
  // shorthand for getHand: getHand
  getHome,
};
*/
