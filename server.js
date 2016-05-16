var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoUser   =   require("./models/mongo").User;
var mongoNote   =   require("./models/mongo").Notes;
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

/*
 router.get("/",function(req,res){
 res.json({"error" : false,"message" : "Hello World"});
 });
 */

router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoUser.find({},function(err,data){
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        console.log(req.body);
        var db = new mongoUser();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.user = req.body.email;
        // Hash the password using SHA1 algorithm.
        db.pass =  require('crypto')
            .createHash('sha1')
            .update(req.body.password)
            .digest('base64');

        db.save(function(err){
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
                res.json(response);

            } else {

                mongoUser.find({},function(err,data){
                    // Mongo command to fetch all data from collection.
                    if(err) {
                        response = {"error" : true,"message" : "Error fetching data"};
                    } else {
                        response = {"error" : false,"message" : data};
                    }
                    res.json(response);
                });

            }
        });
    });

router.route("/users/:id")
    .get(function(req,res){
        var response = {};
        mongoUser.findById(req.params.id,function(err,data){
            // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoUser.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if(req.body.userEmail !== undefined) {
                    // case where email needs to be updated.
                    data.user = req.body.userEmail;
                }
                if(req.body.userPassword !== undefined) {
                    // case where password needs to be updated
                    data.pass = req.body.userPassword;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        // find the data
        mongoUser.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                mongoUser.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                        res.json(response);
                    } else {

                        mongoUser.find({},function(err,data){
                            // Mongo command to fetch all data from collection.
                            if(err) {
                                response = {"error" : true,"message" : "Error fetching data"};
                            } else {
                                response = {"error" : false,"message" : data};
                            }
                            res.json(response);
                        });

                    }
                });
            }
        });
    });

app.use('/',router);

app.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

app.get('/core.js', function(req, res) {
    res.sendfile('./public/core.js');
});

app.listen(3000);
console.log("Listening to PORT 3000");


