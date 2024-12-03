// Import json-server and other required modules
const jsonServer = require('json-server');
const cors = require('cors');

// Create an Express-like server instance
const server = jsonServer.create();

// Use default middleware from json-server
const middlewares = jsonServer.defaults();

// Set up CORS (Cross-Origin Resource Sharing) to allow Angular app to connect
server.use(cors());

// Use the default JSON router (which will be based on a `db.json` file)
const router = jsonServer.router('db.json');

// Apply default middlewares and the router to the server
server.use(middlewares);
server.use(router);

// Start the server on port 3000
server.listen(3000, () => {
  console.log('JSON Server is running on http://mock-backend:3000');
});
