/**
 * Created by Shikher on 13-Sep-16.
 */


var config = require('../config');


var tenantController = function (Tenant) {

    var post = function (req, res) {

        config.checkToken(req,res);


        var tenant = new Tenant(req.body);
        tenant.save();
        res.status(201).send(tenant);
    };


    var get = function (req, res) {

        config.checkToken(req,res);


        var id = req.params.id;

        var obj = {
            _id: id
        };

        /**
         * find method takes an object for query and matches the id
         * in parameter with tenantId
         */

        Tenant.find(obj, function (error, tenant) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(tenant);
            }
        });
    };


    var put = function (req, res) {

        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with tenantId
         */

        Tenant.findById(req.params.id, function (error, tenant) {
            if (error) {
                res.status(500).send(error);
            } else {
                tenant.email = req.body.email;
                tenant.firstName = req.body.firstName;
                tenant.lastName = req.body.lastName;
                tenant.address = req.body.address;
                tenant.mobile = req.body.mobile;
                tenant.save();
                res.json(tenant);
            }
        });
    }


    var del = function (req, res) {

        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with tenantId
         */

        Tenant.findById(req.params.id, function (error, tenant) {
            if (error) {
                res.status(500).send(error);
            } else {

                tenant.remove(function (error) {
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

module.exports = tenantController;


