var expand = require("reducers/expand")
var callback = require("callback-reduce")

module.exports = remove

function remove(collection, selector, options) {
    return expand(collection, function (collection) {
        return callback.call(collection, collection.remove
            , selector, options)
    })
}
