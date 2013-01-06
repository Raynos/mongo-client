var callback = require("callback-reduce")
var expand = require("reducers/expand")

module.exports = mapReduce

function mapReduce(collection, map, reduce, options) {
    return expand(collection, function (collection) {
        return callback.call(collection, collection.mapReduce
            , map, reduce, options || {})
    })
}
