/**
 * Created by Shikher on 13-Sep-16.
 */


var config = require('../config');


var savedSearchController = function (SavedSearch) {

    var post = function (req, res) {

        config.checkToken(req,res);


        var savedSearch = new SavedSearch(req.body);
        savedSearch.save();
        res.status(201).send(savedSearch);
    };


    var get = function (req, res) {

        config.checkToken(req,res);


        var id = req.params.id;

        var obj = {
            _id: id
        };

        /**
         * find method takes an object for query and matches the id
         * in parameter with savedSearchId
         */

        SavedSearch.find(obj, function (error, savedSearch) {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(savedSearch);
            }
        });
    };


    var put = function (req, res) {


        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with savedSearchId
         */

        SavedSearch.findById(req.params.id, function (error, savedSearch) {
            if (error) {
                res.status(500).send(error);
            } else {
                savedSearch.email = req.body.email;
                savedSearch.firstName = req.body.firstName;
                savedSearch.lastName = req.body.lastName;
                savedSearch.address = req.body.address;
                savedSearch.mobile = req.body.mobile;
                savedSearch.save();
                res.json(savedSearch);
            }
        });
    }


    var del = function (req, res) {


        config.checkToken(req,res);


        /**
         * findById method takes id for query and matches the id
         * in parameter with savedSearchId
         */

        SavedSearch.findById(req.params.id, function (error, savedSearch) {
            if (error) {
                res.status(500).send(error);
            } else {
                savedSearch.remove(function (error) {
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

module.exports = savedSearchController;


