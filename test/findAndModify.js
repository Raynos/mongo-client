import { test } from "tape"
import { fold } from "reducers"
import { uuid } from "node-uuid"

import { findAndModify, findOne, insert, close } from ".."
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

test("find document", function (assert) {
    var doc = findAndModify(collection, {
        foo: value
    }, [["_id", -1]], {
        $set: {
            count: 1
        }
    }, {
        new: true
    })

    fold(doc, function (doc) {
        assert.equal(doc.count, 1)
        assert.end()
    })
})

test("was modified", function (assert) {
    var doc = findOne(collection, {
        foo: value
    })

    fold(doc, function (doc) {
        assert.equal(doc.count, 1)
        assert.end()
    })
})

test("close", function (assert) {
    close(collection, function (err) {
        assert.ifError(err)
        assert.end()
    })
})
