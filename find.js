var expand = require("reducers/expand")
var callback = require("callback-reduce")

var CursorReduce = require("./cursor")

// var cursor = require("./cursor")

module.exports = find

function find(collection, selector, options) {
    return expand(collection, function (collection) {
        var cursor = callback.call(collection, collection.find
            , selector || {}, options || {})

        return expand(cursor, CursorReduce)
    })
}
