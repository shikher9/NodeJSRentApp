/**
 * Created by Shikher on 14-Sep-16.
 */

var express = require('express');


/**
 * express.Router creates modular, mountable route handlers and is a middleware
 */


var routes = function (House) {

    //creating router
    var houseRouter = express.Router();

    //getting controller
    var houseController = require('../controllers/houseController')(House);


    houseRouter.route('/:id')
        .get(houseController.get)
        .put(houseController.put)
        .delete(houseController.del);

    houseRouter.route('/')
        .post(houseController.post);

    return houseRouter;
};

module.exports = routes;