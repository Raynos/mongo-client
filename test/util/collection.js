var mongo = require("../..")

module.exports = collection

function collection() {
    var client = mongo("mongodb://localhost:27017/mongo-client-test")

    return client("test23")
}
