var test = require("tape")
var fold = require("reducers/fold")
var uuid = require("node-uuid")

var findOne = require("../findOne")
var insert = require("../insert")
var close = require("../close")
var Collection = require("./util/collection")

var collection = Collection()
var value = uuid()

test("insert document", function (assert) {
    var result = insert(collection, {
        foo: value
    })

    fold(result, function (result) {
        assert.equal(result.foo, value)
        assert.ok(result._id)
        assert.end()
    })
})

test("find the document", function (assert) {
    var doc = findOne(collection, {
        foo: value
    })

    fold(doc, function (doc) {
        assert.equal(doc.foo, value)
        assert.end()
    })
})

test("find no documents", function (assert) {
    var docs = findOne(collection, {
        foo: value + "1"
    })

    fold(docs, function (result) {
        assert.equal(result, null)
        assert.end()
    })
})

test("close", function (assert) {
    close(collection, function (err) {
        assert.ifError(err)
        assert.end()
    })
})
