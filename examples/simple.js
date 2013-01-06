var uuid = require("node-uuid")
var assert = require("assert")
var fold = require("reducers/fold")
var expand = require("reducers/expand")

var mongo = require("..")
var insert = require("../insert")
var findOne = require("../findOne")
var close = require("../close")

var client = mongo("mongodb://localhost:27017/mongo-client-example")
var collection = client(uuid())

var insertResult = insert(collection, {
    hello: "world"
})

var findResult = expand(insertResult, function (item) {
    assert.equal(item.hello, "world")
    return findOne(collection, {
        hello: "world"
    })
})

fold(findResult, function (value) {
    assert.equal(value.hello, "world")
    console.log("value", value)
    close(collection)
})
