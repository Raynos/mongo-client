var test = require("tape")
var uuid = require("node-uuid")
var fold = require("reducers/fold")
var take = require("reducers/take")

var find = require("../find")
var update = require("../update")
var close = require("../close")
var Collection = require("./util/collection")

var collection = Collection()
var value = uuid()

test("can upsert document", function (assert) {
    var result = update(collection, {
        foo: value
    }, {
        $set: {
            foo: value
        }
    }, {
        upsert: true
    })

    fold(result, function (value) {
        assert.equal(value, 1)
        assert.end()
    })
})

test("can update a document", function (assert) {
    var result = update(collection, {
        foo: value
    }, {
        $set: {
            foo: value + value
        }
    })

    fold(result, function (value) {
        assert.equal(value, 1)
        assert.end()
    })
})

test("correctly updated", function (assert) {
    fold(take(find(collection, {
        foo: value + value
    }), 1), function (result) {
        assert.equal(result.foo, value + value)

        close(collection, function (err) {
            assert.ifError(err)
            assert.end()
        })
    })
})
