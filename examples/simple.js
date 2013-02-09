import { uuid } from "node-uuid"
import { assert } from "node"
import { fold, expand } from "reducers"

import { mongo, insert, findOne, close } from ".."

var client = mongo("mongodb://localhost:27017/mongo-client-example")
var collection = client(uuid())

var insertResult = insert(collection, {
    hello: "world"
})

var findResult = expand(insertResult, function (item) {
    assert.equal(item.hello, "world")
    return findOne(collection, {
        _id: item._id
    })
})

fold(findResult, function (value) {
    assert.equal(value.hello, "world")
    console.log("value", value)
    close(collection)
})
