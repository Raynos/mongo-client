import { test } from "tape"
import { fold } from "reducers"
import { uuid } from "node-uuid"

import { remove, findOne, insert, close } from ".."
import { Collection } from "./util"

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
