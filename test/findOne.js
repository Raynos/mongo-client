import { test } from "tape"
import { fold } from "reducers"
import { uuid } from "node-uuid"

import { findOne, insert, close } from ".."
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
