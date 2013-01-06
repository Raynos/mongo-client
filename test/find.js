var test = require("tape")
var fold = require("reducers/fold")
var take = require("reducers/take")
var uuid = require("node-uuid")

var find = require("../find")
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
    var doc = take(find(collection, {
        foo: value
    }), 1)

    fold(doc, function (doc) {
        assert.equal(doc.foo, value)
        assert.end()
    })
})

test("find no documents", function (assert) {
    var docs = find(collection, {
        foo: value + "1"
    })
    var called = false

    var result = fold(docs, function () {
        called = true
    }, {})

    fold(result, function end() {
        assert.equal(called, false)
        assert.end()
    })
})

test("close", function (assert) {
    close(collection, function (err) {
        assert.ifError(err)
        assert.end()
    })
})
