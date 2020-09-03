// importing the app
const app = require("./app");
const http = require("http");

// load configuration through environment variables from .env to process.env
require("dotenv").config();

// create a server and start listening at configured port
const server = http.createServer(app);
server.listen(process.env.NODE_PORT || 8080, function() {
  console.log("Express server listening on port " + process.env.NODE_PORT || 8080);
});
