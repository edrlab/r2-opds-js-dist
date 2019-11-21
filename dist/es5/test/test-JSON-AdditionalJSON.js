"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var serializable_1 = require("r2-lcp-js/dist/es5/src/serializable");
var init_globals_1 = require("../src/opds/init-globals");
var opds2_1 = require("../src/opds/opds2/opds2");
var opds2_metadata_1 = require("../src/opds/opds2/opds2-metadata");
var helpers_1 = require("./helpers");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
var titleStr1 = "str1";
var titleStr2 = "str2";
var titleStr3 = "str3";
var n = 999;
ava_1.default("JSON SERIALIZE: Metadata.AdditionalJSON", function (t) {
    var md = new opds2_metadata_1.OPDSMetadata();
    md.Title = titleStr1;
    md.NumberOfItems = n;
    md.AdditionalJSON = {
        title2: titleStr2,
        tizz: {
            sub1: true,
            sub2: null,
            sub3: {
                inner1: n,
                inner2: [titleStr3, 888, false],
            },
        },
    };
    var pub = new opds2_1.OPDSFeed();
    pub.Metadata = md;
    helpers_1.inspect(pub);
    var jsonPub = serializable_1.TaJsonSerialize(pub);
    helpers_1.logJSON(jsonPub);
    var json = jsonPub.metadata;
    helpers_1.checkType_Number(t, json.numberOfItems);
    t.is(json.numberOfItems, n);
    helpers_1.checkType_String(t, json.title);
    t.is(json.title, titleStr1);
    if (!json.tizz) {
        t.fail();
        return;
    }
    helpers_1.checkType_Object(t, json.tizz);
    t.is(json.tizz.sub1, true);
    if (json.tizz.sub2 || json.tizz.sub2 !== null) {
        t.fail();
        return;
    }
    if (!json.tizz.sub3) {
        t.fail();
        return;
    }
    helpers_1.checkType_Number(t, json.tizz.sub3.inner1);
    t.is(json.tizz.sub3.inner1, n);
    if (!json.tizz.sub3.inner2) {
        t.fail();
        return;
    }
    helpers_1.checkType_Array(t, json.tizz.sub3.inner2);
    t.is(json.tizz.sub3.inner2[0], titleStr3);
    if (!json.tizz.sub3.inner1) {
        t.fail();
        return;
    }
});
ava_1.default("JSON DESERIALIZE: Metadata.AdditionalJSON", function (t) {
    var json = {
        numberOfItems: n,
        title: titleStr1,
        title2: titleStr2,
        tizz: {
            sub1: true,
            sub2: null,
            sub3: {
                inner1: 999,
                inner2: [titleStr3, 888, false],
            },
        },
    };
    var jsonPub = {
        metadata: json,
    };
    helpers_1.logJSON(jsonPub);
    var pub = serializable_1.TaJsonDeserialize(jsonPub, opds2_1.OPDSFeed);
    var md = pub.Metadata;
    helpers_1.inspect(md);
    helpers_1.checkType_Number(t, md.NumberOfItems);
    t.is(md.NumberOfItems, n);
    helpers_1.checkType_String(t, md.Title);
    t.is(md.Title, titleStr1);
    if (!md.AdditionalJSON) {
        t.fail();
        return;
    }
    helpers_1.checkType_String(t, md.AdditionalJSON.title2);
    t.is(md.AdditionalJSON.title2, titleStr2);
    if (!md.AdditionalJSON.tizz) {
        t.fail();
        return;
    }
    helpers_1.checkType_Object(t, md.AdditionalJSON.tizz);
    t.is(md.AdditionalJSON.tizz.sub1, true);
    if (md.AdditionalJSON.tizz.sub2 ||
        md.AdditionalJSON.tizz.sub2 !== null) {
        t.fail();
        return;
    }
    if (!md.AdditionalJSON.tizz.sub3) {
        t.fail();
        return;
    }
    helpers_1.checkType_Number(t, md.AdditionalJSON.tizz.sub3.inner1);
    t.is(md.AdditionalJSON.tizz.sub3.inner1, n);
    if (!md.AdditionalJSON.tizz.sub3.inner2) {
        t.fail();
        return;
    }
    helpers_1.checkType_Array(t, md.AdditionalJSON.tizz.sub3.inner2);
    t.is(md.AdditionalJSON.tizz.sub3.inner2[0], titleStr3);
    if (!md.AdditionalJSON.tizz.sub3.inner1) {
        t.fail();
        return;
    }
});
//# sourceMappingURL=test-JSON-AdditionalJSON.js.map