"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const debug_ = require("debug");
const debug = debug_("r2:opds#test");
async function fn() {
    return Promise.resolve("foo");
}
ava_1.default("dummy async test", async (t) => {
    debug("test ASYNC");
    t.is(await fn(), "foo");
});
//# sourceMappingURL=test.js.map