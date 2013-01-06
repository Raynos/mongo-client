var mongodb = require("mongodb")
var map = require("reducers/map")
var fold = require("reducers/fold")
var callback = require("callback-reduce")
var cache = require("cache-reduce")
var MongoClient = mongodb.MongoClient

module.exports = mongo

function mongo(uri, options) {
    var mongoClient = cache(callback(MongoClient.connect, uri, options || {}))

    return client

    function client(collectionName) {
        return map(mongoClient, function (db) {
            return db.collection(collectionName)
        })
    }
}
