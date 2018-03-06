const express = require("express");
const route = express.Router();
const bcrypt = require('bcryptjs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

let users = require('../routes/users');
// app.use('/articles', articles);



//connect to databse
mongoose.connect("mongodb://localhost/images");
let db = mongoose.connection;




//this is the main route of the app.
//Create the route
route.get("/",function(req, res, next) {
 
    //render the view
    res.render("main");
 
});


route.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  
  // Express Messages Middleware
  route.use(require('connect-flash')());
  route.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });
  
  // Express Validator Middleware
  route.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  
  // Passport Config
  require('../config/passport')(passport);
  // Passport Middleware
  route.use(passport.initialize());
  route.use(passport.session());
  
  route.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });
  
  // Home Route
//   route.get('/', function(req, res){
//     Article.find({}, function(err, articles){
//       if(err){
//         console.log(err);
//       } else {
//         res.render('index', {
//           title:'Articles',
//           articles: articles
//         });
//       }
//     });
//   });
  
  // Route Files
  // let articles = require('./routes/articles');
  // app.use('/articles', articles);
  route.use('/users', users);
  





//export the module
module.exports = route;
