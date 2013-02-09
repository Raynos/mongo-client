import { reduce, end, isReduced } from "reducible"
import { Cursor } from "mongodb"

reduce.define(Cursor, function (cursor, next, initial) {
    var result = initial

    recurse()

    function recurse() {
        cursor.nextObject(function (error, value) {
            if (error) {
                return next(error, result)
            }

            if (value === null) {
                return next(end, result)
            }

            result = next(value, result)

            if (isReduced(result)) {
                cursor.close(function () {
                    next(end, result.value)
                })
            } else {
                recurse()
            }
        })
    }
})
