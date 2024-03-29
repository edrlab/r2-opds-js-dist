"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const serializable_1 = require("r2-lcp-js/dist/es6-es2015/src/serializable");
const init_globals_1 = require("../src/opds/init-globals");
const opds2_1 = require("../src/opds/opds2/opds2");
const helpers_1 = require("./helpers");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
const contextStr1 = "http://context1";
const contextStr2 = "http://context2";
(0, ava_1.default)("JSON SERIALIZE: OPDSFeed.Context => string[]", (t) => {
    const feed = new opds2_1.OPDSFeed();
    feed.Context = [];
    feed.Context.push(contextStr1);
    feed.Context.push(contextStr2);
    (0, helpers_1.inspect)(feed);
    const json = (0, serializable_1.TaJsonSerialize)(feed);
    (0, helpers_1.logJSON)(json);
    (0, helpers_1.checkType_Array)(t, json["@context"]);
    const ctx = json["@context"];
    t.is(ctx.length, 2);
    (0, helpers_1.checkType_String)(t, ctx[0]);
    t.is(ctx[0], contextStr1);
    (0, helpers_1.checkType_String)(t, ctx[1]);
    t.is(ctx[1], contextStr2);
});
(0, ava_1.default)("JSON SERIALIZE: OPDSFeed.Context => string[1] collapse-array", (t) => {
    const feed = new opds2_1.OPDSFeed();
    feed.Context = [contextStr1];
    (0, helpers_1.inspect)(feed);
    const json = (0, serializable_1.TaJsonSerialize)(feed);
    (0, helpers_1.logJSON)(json);
    (0, helpers_1.checkType_String)(t, json["@context"]);
    t.is(json["@context"], contextStr1);
});
(0, ava_1.default)("JSON DESERIALIZE: OPDSFeed.Context => string[]", (t) => {
    const json = {};
    json["@context"] = [contextStr1, contextStr2];
    (0, helpers_1.logJSON)(json);
    const feed = (0, serializable_1.TaJsonDeserialize)(json, opds2_1.OPDSFeed);
    (0, helpers_1.inspect)(feed);
    (0, helpers_1.checkType_Array)(t, feed.Context);
    t.is(feed.Context.length, 2);
    (0, helpers_1.checkType_String)(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
    (0, helpers_1.checkType_String)(t, feed.Context[1]);
    t.is(feed.Context[1], contextStr2);
});
(0, ava_1.default)("JSON DESERIALIZE: OPDSFeed.Context => string[1]", (t) => {
    const json = {};
    json["@context"] = [contextStr1];
    (0, helpers_1.logJSON)(json);
    const feed = (0, serializable_1.TaJsonDeserialize)(json, opds2_1.OPDSFeed);
    (0, helpers_1.inspect)(feed);
    (0, helpers_1.checkType_Array)(t, feed.Context);
    t.is(feed.Context.length, 1);
    (0, helpers_1.checkType_String)(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
});
(0, ava_1.default)("JSON DESERIALIZE: OPDSFeed.Context => string", (t) => {
    const json = {};
    json["@context"] = contextStr1;
    (0, helpers_1.logJSON)(json);
    const feed = (0, serializable_1.TaJsonDeserialize)(json, opds2_1.OPDSFeed);
    (0, helpers_1.inspect)(feed);
    (0, helpers_1.checkType_Array)(t, feed.Context);
    t.is(feed.Context.length, 1);
    (0, helpers_1.checkType_String)(t, feed.Context[0]);
    t.is(feed.Context[0], contextStr1);
});
//# sourceMappingURL=test-JSON-Context.js.map