var expand = require("reducers/expand")
var take = require("reducers/take")
var callback = require("callback-reduce")

module.exports = findAndRemove

function findAndRemove(collection, query, sort, options) {
    return take(expand(collection, function (collection) {
        return callback.call(collection
            , collection.findAndRemove, query, sort || []
            , options || {})
    }), 1)
}
