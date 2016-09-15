/**
 * Created by Shikher on 13-Sep-16.
 */


var config = require('../config');

var landlordController = function (Landlord) {

    var post = function (req, res) {

        config.checkToken(req,res);


        var landlord = new Landlord(req.body);
        landlord.save();
        res.status(201).send(landlord);
    };


    var get = function (req, res) {

        config.checkToken(req,res);


        var id = req.params.id;

        var obj = {
            _id: id
        };

        /**
         * find method takes an object for query and matches the id
         * in parameter with landlordId
         */

        Landlord.find(obj, function (error, landlord) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(landlord);
            }
        });
    };


    var put = function (req, res) {

        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with landlordId
         */

        Landlord.findById(req.params.id, function (error, landlord) {
            if (error) {
                res.status(500).send(error);
            } else {
                landlord.email = req.body.email;
                landlord.firstName = req.body.firstName;
                landlord.lastName = req.body.lastName;
                landlord.address = req.body.address;
                landlord.houseListIds = req.body.houseListIds;
                landlord.mobile = req.body.mobile;
                landlord.save();
                res.json(landlord);
            }
        });
    }


    var del = function (req, res) {

        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with landlordId
         */

        Landlord.findById(req.params.id, function (error, landlord) {
            if (error) {
                res.status(500).send(error);
            } else {

                landlord.remove(function (error) {
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

module.exports = landlordController;


