var expand = require("reducers/expand")
var callback = require("callback-reduce")

var cursor = require("./cursor")

module.exports = find

function find(collection, selector, options) {
    return expand(collection, function (collection) {
        return callback.call(collection, collection.find
            , selector || {}, options || {})
    })
}
