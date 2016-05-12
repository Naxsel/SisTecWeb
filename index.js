'use strict';
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./models/mongo");
var router = express.Router();
var server = require("./p4/server");
var old_router = require("./p4/router");
var requestHandlers = require("./p4/requestHandlers");
var doRequest = require('request');

var url2 = "http://localhost:8081";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    console.log("Peticion para el servidor de notas, redireccionando");
    res.redirect(url2+"/");
});

router.route("/users")
    .get(function(req,res) {
        var response = {};
        mongoOp.find({}, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        })
    })
    .post(function (req, res) {
        var db = new mongoOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.user = req.body.email;
        // Hash the password using SHA1 algorithm.
        db.pass = require('crypto')
            .createHash('sha1')
            .update(req.body.password)
            .digest('base64');
        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = {"error": true, "message": "Error adding data"};
            } else {
                response = {"error": false, "message": "Data added"};
            }
            res.json(response);
        });
    });

router.route("/users/:id")
    .get(function (req, res) {
        var response = {};
        mongoOp.findById(req.params.id, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })
    .put(function (req, res) {
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if (req.body.user !== undefined) {
                    // case where email needs to be updated.
                    data.user = req.body.user;
                }
                if (req.body.pass !== undefined) {
                    // case where password needs to be updated
                    data.pass = req.body.pass;
                }
                // save the data
                data.save(function (err) {
                    if (err) {
                        response = {"error": true, "message": "Error updating data"};
                    } else {
                        response = {"error": false, "message": "Data is updated for " + req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function (req, res) {
        var response = {};
        // find the data
        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // data exists, remove it.
                mongoOp.remove({_id: req.params.id}, function (err) {
                    if (err) {
                        response = {"error": true, "message": "Error deleting data"};
                    } else {
                        response = {
                            "error": true,
                            "message": "Data associated with " + req.params.id + "is deleted"
                        };
                    }
                    res.json(response);
                });
            }
        });
    });

router.route("/login")
    .get(function (req, res) {
        console.log("Peticion para el servidor de notas, redireccionando");
        res.redirect(url2+"/");
    });


router.route("/register")
    .get(function (req, res) {
        console.log("Peticion para el servidor de notas, redireccionando");
        res.redirect(url2+"/register");
    });

var handle = {};
handle["/"] = requestHandlers.home;
handle["/setMemo"] = requestHandlers.setMemo;
handle["/deleteMemo"] = requestHandlers.deleteMemo;
handle["/showAllMemo"] = requestHandlers.show;
handle["/showMemo"] = requestHandlers.showMemo;
handle["/login"] = requestHandlers.login;
handle["/register"] = requestHandlers.register;
server.start(old_router.route, handle);

app.use('/',router);
app.listen(8080);
console.log("Listening to PORT 8080");




