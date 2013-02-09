import { test } from "tape"
import { mongo, close } from ".."

test("mongo is a function", function (assert) {
    assert.equal(typeof mongo, "function")
    assert.end()
})

test("mongo returns a function", function (assert) {
    var client = mongo("mongodb://localhost:27017/mongo-client-test")
    assert.equal(typeof client, "function")
    close(client("tests"), function (err) {
        assert.ifError(err)
        assert.end()
    })
})

test("client returns a collection", function (assert) {
    var client = mongo("mongodb://localhost:27017/mongo-client-test")
    var collection = client("tests")

    assert.equal(typeof collection, "object")
    close(collection, function (err) {
        assert.ifError(err)
        assert.end()
    })
})
