/**
 * Created by Shikher on 12-Sep-16.
 */

var express = require('express');

var config = require('../config');


/**
 * express.Router creates modular, mountable route handlers and is a middleware
 */


var routes = function (Tenant, SavedSearch, House) {

    //creating router
    var tenantRouter = express.Router();

    //getting controller
    var tenantController = require('../controllers/tenantController')(Tenant);


    tenantRouter.route('/:id')
        .get(tenantController.get)
        .put(tenantController.put)
        .delete(tenantController.del);

    tenantRouter.route('/')
        .post(tenantController.post);

    //save search
    tenantRouter.route('/:id/SaveSearch')
        .post(function (req, res) {
            var savedSearch = new SavedSearch(req.body);
            savedSearch.save();
            res.status(201).send(savedSearch);
        });

    //get search criteria listings
    tenantRouter.route('/:id/SavedSearchListings')
        .get(function (req, res) {

            config.checkToken(req,res);

            var id = req.params.id;

            var obj = {
                tenantId: id
            };

            /**
             * find method takes an object for query and matches the id
             * in parameter with tenantId
             */

            SavedSearch.find(obj, function (error, savedSearch) {
                if (error) {
                    res.status(500).send(error);
                } else {
                    House.find(searchObj, function (error2, houseResult) {
                        if (error2) {
                            res.status(500).send(error);
                        } else {
                            res.status(200).send(houseResult);
                        }
                    })
                }
            });
        });


    return tenantRouter;
};

module.exports = routes;