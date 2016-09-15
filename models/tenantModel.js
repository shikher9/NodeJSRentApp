/**
 * Created by Shikher on 12-Sep-16.
 */


var mongoose = require('mongoose');

/**
 * Creating tenant schema from mongoose, this schema is used by mongoose
 * for converting data in mongodb to json objects
 */

var schema = mongoose.Schema;

/**
 email is used as a primary key, therefore for _id, enter email
 */
var tenantModel = new schema({
    _id: {type: String},
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    address: {type: String},
    mobile: {type: Number}
});

/**
 * exporting the schema as a model
 * @type {any}
 */
module.exports = mongoose.model('Tenant', tenantModel);