import { fold } from "reducible"

export = close

function close(collection, callback) {
    return fold(collection, function (collection) {
        if (collection.close) {
            return collection.close(callback)
        }

        collection.db.close(callback)
    })
}
