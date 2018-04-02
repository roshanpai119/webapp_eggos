var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');


var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(path.join(__dirname, 'views/public')));

//LOGGING REQUESTS TO CONSOLE
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.post('/upload', function(req, res){

    // create an incoming form object
    var form = new formidable.IncomingForm();
  
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
  
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, 'views/public/uploads');
  
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
  
    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
  
    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
      res.end('success');
    });
  
    // parse the incoming request containing the form data
    form.parse(req);
  
  });


//routes
require('./app/routes.js')(app);

//launch
app.listen(port);
console.log('The magic happens on port' + port);

