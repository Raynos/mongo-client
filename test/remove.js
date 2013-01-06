var test = require("tape")
var fold = require("reducers/fold")
var uuid = require("node-uuid")

var remove = require("../remove")
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

test("remove document", function (assert) {
    var result = remove(collection, {
        foo: value
    })

    fold(result, function (result) {
        assert.equal(result, 1)
        assert.end()
    })
})

test("document was removed", function (assert) {
    fold(findOne(collection, {
        foo: value
    }), function (result) {
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
