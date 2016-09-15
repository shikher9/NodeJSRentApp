/**
 * Created by Shikher on 14-Sep-16.
 */

var express = require('express')

/**
 * used to create, sign, and verify tokens
 */
var jwt = require('jsonwebtoken');


var config = require('../config');


/**
 * express.Router creates modular, mountable route handlers and is a middleware
 */


var routes = function (User) {

    //creating router
    var userRouter = express.Router();

    //getting controller
    var userController = require('../controllers/userController')(User);


    userRouter.route('/:id')
        .get(userController.get)
        .put(userController.put)
        .delete(userController.del);

    userRouter.route('/')
        .post(userController.post);

    userRouter.post('/authenticate', function (req, res) {
        User.findOne({
            name: req.body.username
        }, function (error, user) {

            if (error) throw error;

            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {

                /**
                 * If user is found,check the password
                 */
                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {
                    /**
                     * Create a token if a user is legit
                     */
                    var token = jwt.sign(user, config.secret, {
                        expiresInMinutes: 60
                    });

                    /**
                     * Return the json response which includes token
                     */
                    res.json({
                        success: true,
                        message: 'Grab your token',
                        token: token
                    });
                }

            }

        });

    });

    return userRouter;
};

module.exports = routes;