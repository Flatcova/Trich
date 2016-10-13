var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

// REQUEST MODELS

var User = require('./models/user');

// SETTING ROUTES

var main = require('./routes/main/index');

var catalog = require('./routes/products/catalog');
var product = require('./routes/products/product');

var signup = require('./routes/users/signup');
var login = require('./routes/users/login');
var logout = require('./routes/users/logout');
var profile = require('./routes/users/profile');

// var cart = require('./routes/main/users/cart');
// var cart = require('./routes/main/users/orders');
// var whishlist = require('./routes/users/whishlist');
// var history = require('./routes/users/history');

var configDB = require('./config/database.js');

var app = express();
var engine = require('ejs-mate');

// configuration ===============================================================
mongoose.connect(configDB.url, function(err){
  if (!err)
    console.log('Connected to database');
}); // connect to our database



app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUnitialized: true,
  secret: "T^!c4",
  store: new MongoStore({url: configDB.url, autoReconnect:true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(morgan('dev'));

app.use('/', main);

app.use('/catalog', catalog);
app.use('/product', product);

app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/profile', profile);

// app.use('/cart', cart);
// app.use('/whishlist', whishlist);
// app.use('/orders', orders);
// app.use('/history', history);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('main/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('main/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
