// importing the app
const app = require("./app");

// load configuration through environment variables from .env to process.env
require("dotenv").config();

var HTTPsMode = process.env.HTTPS;
var server = null;



if (HTTPsMode==="true") {
  console.log("Start backend server with HTTPS.");
  var https =require("https");
  var fs = require('fs');
  server = https.createServer({
    key:fs.readFileSync(process.env.HTTPSKEY),
    cert: fs.readFileSync(process.env.HTTPSCERT)
    }, app);

}else {
  console.log("Start backend server with HTTP.");
  var http =require("http");
  // create a server and start listening at configured port
  server = http.createServer(app);
}

server.listen(process.env.API_PORT || 8080, function() {
  console.log("Express server listening on port " + process.env.API_PORT || 8080);
});
