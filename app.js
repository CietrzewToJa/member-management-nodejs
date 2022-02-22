var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sessions = require('express-session');
var bodyParser = require('body-parser'); // parser middleware
var passport = require('passport');  // authentication
var session = require('express-session');  // session middleware
var connectEnsureLogin = require('connect-ensure-login'); //authorization

var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var UserDetails = require('./models/user')

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var mongoDB = 'mongodb+srv://user1:*@cluster0.xtj1h.mongodb.net/member_management?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use('/', catalogRouter);  // Add catalog routes to middleware chain.

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
