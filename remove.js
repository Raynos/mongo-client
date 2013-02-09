import { expand } from "reducers"
import { callback } from "callback-reduce"

export = remove

function remove(collection, selector, options) {
    return expand(collection, function (collection) {
        return callback.call(collection, collection.remove
            , selector, options)
    })
}
