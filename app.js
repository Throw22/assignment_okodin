const express = require("express");
const app = express();
const server = require("http").createServer(app);
server.listen(process.env.PORT || 3000);

// Set up handlebars
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs({
  defaultLayout: "application",
  partialsDir: 'views/',
  extname: '.hbs' }));
app.set("view engine", "hbs");



// Set up body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// HTTP method overriding
app.use((req, res, next) => {
  var method;
  // Allow method overriding in
  // the query string and POST data
  // and remove the key after found
  if (req.query._method) {
    method = req.query._method;
    delete req.query._method;
  } else if (typeof req.body === 'object' && req.body._method) {
    method = req.body._method;
    delete req.body._method;
  }
  // Upcase the method name
  // and set the request method
  // to override it from GET to
  // the desired method
  if (method) {
    method = method.toUpperCase();
    req.method = method;
  }
  next();
});

// Set up cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Set up logging with Morgan
var morgan = require('morgan');
app.use(morgan('tiny'));
app.use((req, res, next) => {
  ['query', 'params', 'body'].forEach((key) => {
    if (req[key]) {
      var capKey = key[0].toUpperCase() + key.substr(1);
      var value = JSON.stringify(req[key], null, 2);
      console.log(`${ capKey }: ${ value }`);
    }
  });
  next();
});

// Set up serving static middleware
app.use(express.static(__dirname + "/public"));

const index = require('./routes/index');
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



