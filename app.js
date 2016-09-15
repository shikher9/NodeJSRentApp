/**
 * Created by Shikher on 12-Sep-16.
 */


/**
 *  Importing express
 *  Node.js follows the CommonJS module system, and the builtin require function is the
 *  easiest way to include modules that exist in separate files.
 *  The basic functionality of require is that it reads a javascript file,
 *  executes the file, and then proceeds to return the exports object.
 */
var express = require('express');

/**
 * For logging requests to console
 * @type {morgan}
 */
var morgan = require('morgan');


/**
 * get our config file
 */
var config = require('./config');


/**
 * Importing mongoose and connecting to database
 * 'rentapp' is the name of the database, even if the database is not there it will be created
 */

var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://127.0.0.1:27017/rentapp');

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + 'mongodb://127.0.0.1:27017/rentapp');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


/**
 * Creating an instance of express
 */
var app = express();


/**
 * Importing and using body parser - It is a middleware for adding json data to the request body.
 */

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/**
 * Importing models
 */

var Tenant = require('./models/tenantModel');
var Landlord = require('./models/landlordModel');
var House = require('./models/houseModel');
var SavedSearch = require('./models/savedSearchModel');
var User = require('./models/userModel');


/**
 * Importing router for tenant and landlord,
 */

var tenantRouter = require('./routes/tenantRoutes')(Tenant, SavedSearch, House);
var landlordRouter = require('./routes/landlordRoutes')(Landlord, House);
var houseRouter = require('./routes/houseRoutes')(House);
var savedSearchRouter = require('./routes/savedSearchRoutes')(SavedSearch);
var userRouter = require('./routes/userRoutes')(User);


/**
 *  Using the routers and setting prefix
 */

app.use('/api/tenant', tenantRouter);
app.use('/api/landlord', landlordRouter);
app.use('/api/house', houseRouter);
app.use('/api/search', savedSearchRouter);
app.use('/api/user', userRouter);


/**
 * use morgan to log requests to the console
 */
app.use(morgan('dev'));

var port = 3000;

/**
 * Starting server at 3000
 */
app.listen(3000, function () {
    console.log("App running on port  : " + port);
});