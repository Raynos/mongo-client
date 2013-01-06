var expand = require("reducers/expand")
var callback = require("callback-reduce")

module.exports = insert

function insert(collection, doc, options) {
    return expand(collection, function (collection) {
        return callback.call(collection, collection.insert
            , doc, options || {})
    })
}
