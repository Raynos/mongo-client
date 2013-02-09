import { expand } from "reducers"
import { callback } from "callback-reduce"

export = insert

function insert(collection, doc, options) {
    return expand(collection, function (collection) {
        return callback.call(collection, collection.insert
            , doc, options || {})
    })
}
