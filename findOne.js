var take = require("reducers/take")
var concat = require("reducers/concat")
var find = require("./find")

module.exports = findOne

function findOne(collection, selector, options) {
    var items = find(collection, selector, options)

    return take(concat(items, [null]), 1)
}
