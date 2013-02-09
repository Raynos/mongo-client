import { take, concat } from "reducers"
import { find } from "."

module.exports = findOne

function findOne(collection, selector, options) {
    var items = find(collection, selector, options)

    return take(concat(items, [null]), 1)
}
