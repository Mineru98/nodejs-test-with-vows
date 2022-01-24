const fs = require("fs");
const vows = require("vows");
const assert = require("assert");
const _ = require("lodash");

vows.describe("First Vows Testing")
    .addBatch({
        "When we open a file": {
            topic: function () {
                fs.open("/tmp/fakefile", "w", this.callback);
            },
            "it works": function (err, fd) {
                assert.ifError(err);
                assert(_.isNumber(fd), "Argument must be a number");
            },
            teardown: function (fd) {
                fs.close(fd, this.callback);
            },
            "and we write to the file": {
                topic: function (fd) {
                    fs.write(fd, "Hello, World!", this.callback);
                },
                "it works": function (err, written, buffer) {
                    assert.ifError(err);
                    assert.greater(written, 0);
                    assert.isString(buffer);
                },
            },
        },
    })
    .run();
