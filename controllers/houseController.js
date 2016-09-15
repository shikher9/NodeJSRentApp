/**
 * Created by Shikher on 13-Sep-16.
 */


var config = require('../config');


var houseController = function (House) {

    var post = function (req, res) {

        config.checkToken(req,res);


        var house = new House(req.body);
        house.save();
        res.status(201).send(house);
    };


    var get = function (req, res) {

        config.checkToken(req,res);

        var id = req.params.id;

        var obj = {
            _id: id
        };

        /**
         * find method takes an object for query and matches the id
         * in parameter with houseId
         */

        House.find(obj, function (error, house) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(house);
            }
        });
    };


    var put = function (req, res) {

        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with tenantId
         */

        House.findById(req.params.id, function (error, house) {
            if (error) {
                res.status(500).send(error);
            } else {
                house.apartment = req.body.apartment;
                house.street = req.body.street;
                house.city = req.body.city;
                house.state = req.body.state;
                house.pin = req.body.pin;
                house.save();
                res.json(house);
            }
        });
    }


    var del = function (req, res) {

        config.checkToken(req,res);



        /**
         * findById method takes id for query and matches the id
         * in parameter with houseId
         */

        House.findById(req.params.id, function (error, house) {
            if (error) {
                res.status(500).send(error);
            } else {

                house.remove(function (error) {
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

module.exports = houseController;


