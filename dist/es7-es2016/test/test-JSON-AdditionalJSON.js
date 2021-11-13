"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const serializable_1 = require("r2-lcp-js/dist/es7-es2016/src/serializable");
const init_globals_1 = require("../src/opds/init-globals");
const opds2_1 = require("../src/opds/opds2/opds2");
const opds2_metadata_1 = require("../src/opds/opds2/opds2-metadata");
const helpers_1 = require("./helpers");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
const titleStr1 = "str1";
const titleStr2 = "str2";
const titleStr3 = "str3";
const n = 999;
(0, ava_1.default)("JSON SERIALIZE: Metadata.AdditionalJSON", (t) => {
    const md = new opds2_metadata_1.OPDSMetadata();
    md.Title = titleStr1;
    md.NumberOfItems = n;
    md.ItemsPerPage = n;
    md.NumberOfPages = n;
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
    const pub = new opds2_1.OPDSFeed();
    pub.Metadata = md;
    (0, helpers_1.inspect)(pub);
    const jsonPub = (0, serializable_1.TaJsonSerialize)(pub);
    (0, helpers_1.logJSON)(jsonPub);
    const json = jsonPub.metadata;
    (0, helpers_1.checkType_Number)(t, json.numberOfItems);
    t.is(json.numberOfItems, n);
    (0, helpers_1.checkType_Number)(t, json.itemsPerPage);
    t.is(json.itemsPerPage, n);
    (0, helpers_1.checkType_Number)(t, json.numberOfPages);
    t.is(json.numberOfPages, n);
    (0, helpers_1.checkType_String)(t, json.title);
    t.is(json.title, titleStr1);
    if (!json.tizz) {
        t.fail();
        return;
    }
    (0, helpers_1.checkType_Object)(t, json.tizz);
    t.is(json.tizz.sub1, true);
    if (json.tizz.sub2 || json.tizz.sub2 !== null) {
        t.fail();
        return;
    }
    if (!json.tizz.sub3) {
        t.fail();
        return;
    }
    (0, helpers_1.checkType_Number)(t, json.tizz.sub3.inner1);
    t.is(json.tizz.sub3.inner1, n);
    if (!json.tizz.sub3.inner2) {
        t.fail();
        return;
    }
    (0, helpers_1.checkType_Array)(t, json.tizz.sub3.inner2);
    t.is(json.tizz.sub3.inner2[0], titleStr3);
    if (!json.tizz.sub3.inner1) {
        t.fail();
        return;
    }
});
(0, ava_1.default)("JSON DESERIALIZE: Metadata.AdditionalJSON", (t) => {
    const json = {
        itemsPerPage: n,
        numberOfItems: n,
        numberOfPages: n,
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
    const jsonPub = {
        metadata: json,
    };
    (0, helpers_1.logJSON)(jsonPub);
    const pub = (0, serializable_1.TaJsonDeserialize)(jsonPub, opds2_1.OPDSFeed);
    const md = pub.Metadata;
    (0, helpers_1.inspect)(md);
    (0, helpers_1.checkType_Number)(t, md.NumberOfItems);
    t.is(md.NumberOfItems, n);
    (0, helpers_1.checkType_Number)(t, md.ItemsPerPage);
    t.is(md.ItemsPerPage, n);
    (0, helpers_1.checkType_Number)(t, md.NumberOfPages);
    t.is(md.NumberOfPages, n);
    (0, helpers_1.checkType_String)(t, md.Title);
    t.is(md.Title, titleStr1);
    if (!md.AdditionalJSON) {
        t.fail();
        return;
    }
    t.true(typeof md.AdditionalJSON.numberOfItems === "undefined");
    t.true(typeof md.AdditionalJSON.itemsPerPage === "undefined");
    t.true(typeof md.AdditionalJSON.numberOfPages === "undefined");
    (0, helpers_1.checkType_String)(t, md.AdditionalJSON.title2);
    t.is(md.AdditionalJSON.title2, titleStr2);
    if (!md.AdditionalJSON.tizz) {
        t.fail();
        return;
    }
    (0, helpers_1.checkType_Object)(t, md.AdditionalJSON.tizz);
    t.is(md.AdditionalJSON.tizz.sub1, true);
    if (md.AdditionalJSON.tizz.sub2 || md.AdditionalJSON.tizz.sub2 !== null) {
        t.fail();
        return;
    }
    if (!md.AdditionalJSON.tizz.sub3) {
        t.fail();
        return;
    }
    (0, helpers_1.checkType_Number)(t, md.AdditionalJSON.tizz.sub3.inner1);
    t.is(md.AdditionalJSON.tizz.sub3.inner1, n);
    if (!md.AdditionalJSON.tizz.sub3.inner2) {
        t.fail();
        return;
    }
    (0, helpers_1.checkType_Array)(t, md.AdditionalJSON.tizz.sub3.inner2);
    t.is(md.AdditionalJSON.tizz.sub3.inner2[0], titleStr3);
    if (!md.AdditionalJSON.tizz.sub3.inner1) {
        t.fail();
        return;
    }
});
//# sourceMappingURL=test-JSON-AdditionalJSON.js.map