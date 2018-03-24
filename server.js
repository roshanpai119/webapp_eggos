var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path')


var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(path.join(__dirname, 'views/public')));


//var configDB = require('./config/database.js')

// CONFIGURING DATABASE
//mongoose.connect(configDB.url);


//LOGGING REQUESTS TO CONSOLE
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');



// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



//routes
require('./app/routes.js')(app, passport);

//launch
app.listen(port);
console.log('The magic happens on port' + port);

