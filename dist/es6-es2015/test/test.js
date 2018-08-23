"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ava_1 = require("ava");
const debug_ = require("debug");
const debug = debug_("r2:opds#test");
function fn() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Promise.resolve("foo");
    });
}
ava_1.test("dummy async test", (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    debug("test ASYNC");
    t.is(yield fn(), "foo");
}));
//# sourceMappingURL=test.js.map