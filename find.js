import { expand } from "reducers"
import { callback } from "callback-reduce"
import { cursor } from "."

export = find

function find(collection, selector, options) {
    return expand(collection, function (collection) {
        return collection.find(selector || {}, options || {})
    })
}
