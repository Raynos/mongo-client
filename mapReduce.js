import { expand } from "reducers"
import { callback } from "callback-reduce"

export = mapReduce

function mapReduce(collection, map, reduce, options) {
    return expand(collection, function (collection) {
        return callback.call(collection, collection.mapReduce
            , map, reduce, options || {})
    })
}
