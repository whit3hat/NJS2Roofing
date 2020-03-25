// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// Api key
const apiKey = "&key=AIzaSyDLw4vXEUzhRZG-sitgk-E3Q5e2nbpOThE";

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

// // AJAX call
// var api = function (){
// var baseURL = "https://maps.googleapis.com/maps/api/staticmap?" + apiKey;
//   $.ajax({
//     url: baseURL,
//     method: "GET",
//   }).then(function(response){
//     console.log(response);

//     var aerial = response;
//     $
//   });

//   api();
// };

// "https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&maptype=satellite&key=AIzaSyDLw4vXEUzhRZG-sitgk-E3Q5e2nbpOThE"
