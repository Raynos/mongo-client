import { uuid } from "node-uuid"
import { equal } from "assert"
import { fold, expand } from "reducers"
import { log } from "@console"

import { mongo, insert, findOne, close } from ".."

var client = mongo("mongodb://localhost:27017/mongo-client-example")
var collection = client(uuid())

var insertResult = insert(collection, {
    hello: "world"
})

var findResult = expand(insertResult, function (item) {
    equal(item.hello, "world")
    return findOne(collection, {
        _id: item._id
    })
})

fold(findResult, function (value) {
    equal(value.hello, "world")
    log("value", value)
    close(collection)
})
