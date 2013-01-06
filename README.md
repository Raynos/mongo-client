# mongo-client

[![build status][1]][2]

No bullshit mongo wrapper

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
var collection = client(uuid())

var insertResult = insert(collection, {
    hello: "world"
})

var findResult = expand(insertResult, function (item) {
    assert.equal(item.hello, "world")
    return findOne(collection, {
        hello: "world"
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

 - update DONE
 - insert DONE
 - remove DONE
 - findAndModify
 - findAndRemove
 - findOne DONE
 - find DONE
 - mapReduce DONE

## Installation

`npm install mongo-client`

## Contributors

 - Raynos

## MIT Licenced


  [1]: https://secure.travis-ci.org/Raynos/mongo-client.png
  [2]: http://travis-ci.org/Raynos/mongo-client
