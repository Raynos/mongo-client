import { test } from "tape"
import { fold, take } from "reducers"
import { uuid } from "node-uuid"

import { find, insert, mapReduce, close } from ".."
import { toArray, Collection } from "./util"

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
