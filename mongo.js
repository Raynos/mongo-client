import { mongodb, MongoClient } from "mongodb"
import { map, fold } from "reducers"
import { callback } from "callback-reduce"
import { cache } from "cache-reduce"

export = mongo

function mongo(uri, options) {
    var mongoClient = cache(callback(MongoClient.connect, uri
        , options || {}))

    return client

    function client(collectionName) {
        return map(mongoClient, function (db) {
            return db.collection(collectionName)
        })
    }
}
