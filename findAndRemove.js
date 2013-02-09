import { expand, take } from "reducers"
import { callback } from "callback-reduce"

export = findAndRemove

function findAndRemove(collection, query, sort, options) {
    return take(expand(collection, function (collection) {
        return callback.call(collection
            , collection.findAndRemove, query, sort || []
            , options || {})
    }), 1)
}
