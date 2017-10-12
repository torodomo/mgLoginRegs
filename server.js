var express = require('express'),
    bodyParser = require('body-parser'),
    session = require("express-session"),
    path = require('path'),
    port = 8000,
    app = express();

app.use(session({secret: 'torodomo'}));
// Set up body-parser to parse form data
app.use(bodyParser.urlencoded({extended: true}));
// static content 
app.use(express.static(path.join(__dirname, './client/static')));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './client/views'));
// We're using ejs as our view engine
app.set('view engine', 'ejs');
// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

// END OF ROUTING...
app.listen(port, function() {
console.log("listening on port: ", port);
});

