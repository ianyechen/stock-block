// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var mongo = require('mongoose');


// // const MongoClient = require('mongodb').MongoClient;
// // const uri = "mongodb+srv://ianc999:Ian123456@stocks-cluster-jtjgc.azure.mongodb.net/test?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true });
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   console.log(collection);
// //   // perform actions on the collection object
// //   client.close();
// // });



// var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function (err, response) {
//     if (err) { console.log(err); }
//     else { console.log('Connected to ' + db, '+', response); }
// })

// var app = express();
// app.use(bodyParser());
// app.use(bodyParser.json({ limit: '5mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// var Schema = mongo.Schema;

// var StocksSchema = new Schema({
//     stockName: { type: String },
//     stockNumber: { type: Number },
//     stockValue: { type: Number }
// }, { versionKey: false });

// var model = mongo.model('stocks', StocksSchema, 'stocks');

// app.post('/api/saveStock', function (req, res) {
//     console.log("prob not....");
//     var mod = new model(req.body);
//     console.log(mod);
//     if (req.body.mode == "Save") {
//         mod.save(function (err, data) {
//             if (err) res.send(err);
//             else res.send({ data: "Record has been inserted." });
//         })
//         console.log("prob yes....");

//     }

//     else {
//         model.findByIdAndUpdate(req.body.id, {
//             stockName: req.body.stockName,
//             stockNumber: req.body.stockNumber,
//             stockValue: req.body.stockValue,

//         }, function (err, data) {
//             console.log("prob hm....");

//             if (err) res.send(err);

//             else res.send({ data: "Record has been updated." })
//         })
//         console.log("prob nope....");

//     }
// });

// // app.post('/api/deleteStock', function (req, res) {
// //     model.remove({ _id: req.body.id }, function (err) {
// //         if (err) res.send(err);
// //         else res.send({ data: "Record has been delete." })
// //     })
// // });

// app.get('/api/getStock', function (req, res) {
//     model.find({}, function (err, data) {
//         if (err) res.send(err);
//         else res.send(data);
//     })
// });

// app.listen(8080, function () {
//     console.log('Server listening on port 8080');
// })

// server.js

const express = require("express");
const server = express();
server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "data";
const collectionName = "movies";
const ObjectID = require('mongodb').ObjectID;


// << db init >>
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });

    // << db CRUD routes >>

    server.post("/items", (request, response) => {
        const item = request.body;
        dbCollection.insertOne(item, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    server.get("/items/all", (request, response) => {
        const itemId = request.params.id;
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
            // return result;
        });
    });

    server.put("/items/:id", (request, response) => {
        const itemId = +request.params.id;
        const item = request.body;
        console.log("Editing item: ", itemId, " to be ", item);

        dbCollection.updateOne({ "_id": itemId }, { $set: {stockValue: request.body.stockValue} }, {upsert: true}, (error, result) => {
            if (error) throw error;
            console.log("result is"+ result);
            // send back entire updated list, to make sure frontend data is up-to-date
            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    server.delete("/items/:id", (request, response) => {
        const itemId = request.params.id;
        console.log("Delete item with id: ", itemId);

        dbCollection.deleteOne({ id: itemId }, function (error, result) {
            if (error) throw error;
            // send back entire updated list after successful request
            dbCollection.find().toArray(function (_error, _result) {
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

}, function (err) { // failureCallback
    throw (err);
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});