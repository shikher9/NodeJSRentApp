/**
 * Created by Shikher on 15-Sep-16.
 */


/**
 * Created by Shikher on 12-Sep-16.
 */

var express = require('express');


/**
 * express.Router creates modular, mountable route handlers and is a middleware
 */


var routes = function (SavedSearch) {

    //creating router
    var savedSearchRouter = express.Router();

    //getting controller
    var savedSearchController = require('../controllers/savedSearchController')(SavedSearch);


    savedSearchRouter.route('/:id')
        .get(savedSearchController.get)
        .put(savedSearchController.put)
        .delete(savedSearchController.del);

    savedSearchRouter.route('/')
        .post(savedSearchController.post);

    return savedSearchRouter;
};

module.exports = routes;