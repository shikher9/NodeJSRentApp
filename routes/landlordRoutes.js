/**
 * Created by Shikher on 12-Sep-16.
 */

var express = require('express');

var config = require('../config');




/**
 * express.Router creates modular, mountable route handlers and is a middleware
 */


var routes = function (Landlord, House) {

    //creating router
    var landlordRouter = express.Router();

    //getting controller
    var landlordController = require('../controllers/landlordController')(Landlord);


    landlordRouter.route('/:id')
        .get(landlordController.get)
        .put(landlordController.put)
        .delete(landlordController.del);

    landlordRouter.route('/')
        .post(landlordController.post);

    //add house by landlord
    landlordRouter.route("/:id/house")
        .post(function (req, res) {

            config.checkToken(req,res);


            /**
             * findById method takes id for query and matches the id
             * in parameter with tenantId
             */

            Landlord.findById(req.params.id, function (error, landlord) {
                if (error) {
                    res.status(500).send(error);
                } else {

                    var house = new House(req.body);
                    house.save(function (error, houseResult) {
                        if (error) {
                            res.status(500).send(error);
                        } else {
                            var houseList = landlord.houseListIds;
                            houseList.push(houseResult._id);
                            landlord.houseListIds = houseList;
                            landlord.save();
                            res.status(201).send(house);
                        }
                    });
                }
            });
        });

    return landlordRouter;
};

module.exports = routes;