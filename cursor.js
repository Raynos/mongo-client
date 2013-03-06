var reducible = require("reducible/reducible")
var end = require("reducible/end")
var isReduced = require("reducible/is-reduced")

module.exports = CursorReduce

function CursorReduce(cursor) {
    return reducible(function (next, initial) {
        var result = initial

        recurse()

        function recurse() {
            cursor.nextObject(function (error, value) {
                if (error) {
                    if (typeof error === "string") {
                        error = new Error(error)
                    }

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
}
