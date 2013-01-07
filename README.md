# mongo-client

[![build status][1]][2]

No bullshit mongo wrapper

Similar to [mongodb][3] or [mongo-col][4] except everything is
    a function that operates on a collection and returns a
    [reducible][5] representation of the result.

## Example

```js
var uuid = require("node-uuid")
var assert = require("assert")
var fold = require("reducers/fold")
var expand = require("reducers/expand")

var mongo = require("mongo-client")
var insert = require("mongo-client/insert")
var findOne = require("mongo-client/findOne")
var close = require("mongo-client/close")

var client = mongo("mongodb://localhost:27017/mongo-client-example")
var collectionName = uuid()
var collection = client(collectionName)

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
```

## Commands

Supports

 - update
 - insert
 - remove
 - findAndModify
 - findAndRemove
 - findOne
 - find
 - mapReduce

## Installation

`npm install mongo-client`

## Contributors

 - Raynos

## MIT Licenced


  [1]: https://secure.travis-ci.org/Raynos/mongo-client.png
  [2]: http://travis-ci.org/Raynos/mongo-client
  [3]: http://mongodb.github.com/node-mongodb-native/
  [4]: https://github.com/Raynos/mongo-col
  [5]: https://github.com/gozala/reducers
