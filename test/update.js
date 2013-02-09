import { test } from "tape"
import { uuid } from "node-uuid"
import { fold , take } from "reducers"

import { find, update, close } from ".."
import { Collection } from "./util"

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
