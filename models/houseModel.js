/**
 * Created by Shikher on 14-Sep-16.
 */


var mongoose = require('mongoose');

/**
 * Creating house schema from mongoose, this schema is used by mongoose
 * for converting data in mongodb to json objects
 */

var schema = mongoose.Schema;

var houseModel = new schema({
    apartment: {type: String},
    street: {type: String},
    city: {type: String},
    state: {type: String},
    pin: {type: Number}
});

/**
 * exporting the schema as a model
 * @type {any}
 */
module.exports = mongoose.model('House', houseModel);


