var expand = require("reducers/expand")
var take = require("reducers/take")
var callback = require("callback-reduce")

module.exports = update

function update(collection, selector, doc, options) {
    return take(expand(collection, function (collection) {
        return callback.call(collection, collection.update
            , selector, doc, options || {})
    }), 1)
}
