var expand = require("reducers/expand")
var take = require("reducers/take")
var callback = require("callback-reduce")

module.exports = findAndModify

function findAndModify(collection, query, sort, doc, options) {
    return take(expand(collection, function (collection) {
        return callback.call(collection
            , collection.findAndModify, query, sort || []
            , doc || {}, options || {})
    }), 1)
}
