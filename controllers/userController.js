/**
 * Created by Shikher on 13-Sep-16.
 */


var config = require('../config');

var userController = function (User) {

    var post = function (req, res) {

        config.checkToken(req,res);

        var user = new User(req.body);
        user.save();
        res.status(201).send(user);
    };


    var get = function (req, res) {

        config.checkToken(req,res);

        var id = req.params.id;

        var obj = {
            _id: id
        };

        /**
         * find method takes an object for query and matches the id
         * in parameter with userId
         */

        User.find(obj, function (error, user) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(user);
            }
        });
    };


    var put = function (req, res) {

        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with userId
         */

        User.findById(req.params.id, function (error, user) {
            if (error) {
                res.status(500).send(error);
            } else {
                user.email = req.body.email;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.address = req.body.address;
                user.mobile = req.body.mobile;
                user.save();
                res.json(user);
            }
        });
    }


    var del = function (req, res) {

        config.checkToken(req,res);



        /**
         * findById method takes id for query and matches the id
         * in parameter with userId
         */

        User.findById(req.params.id, function (error, user) {
            if (error) {
                res.status(500).send(error);
            } else {

                user.remove(function (error) {
                    if (error) {
                        res.status(500).send();
                    } else {
                        res.status(204).send();
                    }
                });

            }
        });

    };

    return {
        post: post,
        get: get,
        put: put,
        del: del
    };

};

module.exports = userController;


