import { take, expand } from "reducers"
import { callback } from "callback-reduce"

export = update

function update(collection, selector, doc, options) {
    return take(expand(collection, function (collection) {
        return callback.call(collection, collection.update
            , selector, doc, options || {})
    }), 1)
}
