var test = require("tape")
var fold = require("reducers/fold")
var take = require("reducers/take")
var uuid = require("node-uuid")

var find = require("../find")
var insert = require("../insert")
var mapReduce = require("../mapReduce")
var close = require("../close")
var toArray = require("./util/toArray")
var Collection = require("./util/collection")

var collection = Collection()
var value = uuid()

test("insert some documents", function (assert) {
    var result = insert(collection, [{
        foo: value
        , count: 1
    }, {
        foo: value
        , count: 2
    }, {
        foo: value
        , count: 3
    }])

    toArray(result, function (err, list) {
        assert.equal(list.length, 3)
        assert.deepEqual(list.map(function (v) {
            return v.count
        }), [1, 2, 3])
        assert.end()
    })
})

test("map reduce them", function (assert) {
    var results = take(mapReduce(collection, map, reduce, {
        out: {
            inline: 1
        }
        , query: {
            foo: value
        }
    }), 1)

    fold(results, function (list) {
        assert.equal(list.length, 1)
        assert.equal(list[0].value, 6)
        assert.end()
    })

    function map(item) {
        /*global emit*/
        emit(this.foo, this.count)
    }

    function reduce(key, values) {
        var count = 0

        values.forEach(function (v) {
            count += v
        })

        return count
    }
})

test("close", function (assert) {
    close(collection, function (err) {
        assert.ifError(err)
        assert.end()
    })
})
