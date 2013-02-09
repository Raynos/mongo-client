import { test } from "tape"
import { fold, take } from "reducers"
import { uuid } from "node-uuid"

import { find, insert, close } from ".."
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
