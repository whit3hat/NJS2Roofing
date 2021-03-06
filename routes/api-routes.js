// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
// var Client = require('../models/user.js');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  app.get('/api/all', function(req, res){
    console.log(res);
      db.Client.findAll({})
      .then(function(cust) {
        res.json(cust);
      });
  });
//api to post the address to the DB
  app.post('/api/address/', function(req, res) {
    console.log(req.body, 'address');
    db.Address.create({
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      county: req.body.state
    })
    .then(function(dbAddress) {
      res.json(dbAddress);
    });
  });

  //api route to post the cusomter info to the DB
  app.post('/api/client' , function(req,res) {
    console.log(req.body, 'client');
    db.Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email
    })
    .then(function(dbClient) {
      res.json(dbClient)
    });
  });

  //api route to post the job related info into the DB
  app.post('/api/job', function(req,res) {
    console.log(req.body , 'job');
    db.Job.create({
      submitDate: req.body.submitDate,
      serviceDate: req.body.serviceDate,
      roofGrade: req.body.roofGrade,
      jobNotes: req.body.jobNotes
    })
    .then (function(dbJob) {
      res.json(dbJob)
    });
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err)
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Router to PUT the customer information to the existing customer page

};


