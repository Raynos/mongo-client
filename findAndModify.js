import { expand, take } from "reducers"
import { callback } from "callback-reduce"

export = findAndModify

function findAndModify(collection, query, sort, doc, options) {
    return take(expand(collection, function (collection) {
        return callback.call(collection
            , collection.findAndModify, query, sort || []
            , doc || {}, options || {})
    }), 1)
}
