/**
 * Created by Shikher on 12-Sep-16.
 */


var mongoose = require('mongoose');

/**
 * Creating user schema from mongoose, this schema is used by mongoose
 * for converting data in mongodb to json objects
 */

var schema = mongoose.Schema;

/**
 email is used as a primary key, therefore for _id, enter email
 */
var userModel = new schema({
    email: {type: String},
    password: {type: String},
    type: {type: String},
    admin: {type: Boolean}
});

/**
 * exporting the schema as a model
 * @type {any}
 */
module.exports = mongoose.model('User', userModel);