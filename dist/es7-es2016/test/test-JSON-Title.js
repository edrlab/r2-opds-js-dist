"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const serializable_1 = require("r2-lcp-js/dist/es7-es2016/src/serializable");
const metadata_1 = require("r2-shared-js/dist/es7-es2016/src/models/metadata");
const init_globals_1 = require("../src/opds/init-globals");
const helpers_1 = require("./helpers");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
const titleStr1 = "str1";
const titleStr2 = "str2";
const titleLang1 = "lang1";
const titleLang2 = "lang2";
const titleLangStr1 = {};
titleLangStr1[titleLang1] = titleStr1;
titleLangStr1[titleLang2] = titleStr2;
const titleLangStr2 = {};
titleLangStr2[titleLang1] = titleStr2;
titleLangStr2[titleLang2] = titleStr1;
(0, ava_1.default)("JSON SERIALIZE: Metadata.Title => string", (t) => {
    const md = new metadata_1.Metadata();
    md.Title = titleStr1;
    (0, helpers_1.inspect)(md);
    const json = (0, serializable_1.TaJsonSerialize)(md);
    (0, helpers_1.logJSON)(json);
    (0, helpers_1.checkType_String)(t, json.title);
    t.is(json.title, titleStr1);
});
(0, ava_1.default)("JSON SERIALIZE: Metadata.Title => string-lang", (t) => {
    const md = new metadata_1.Metadata();
    md.Title = titleLangStr1;
    (0, helpers_1.inspect)(md);
    const json = (0, serializable_1.TaJsonSerialize)(md);
    (0, helpers_1.logJSON)(json);
    (0, helpers_1.checkType_Object)(t, json.title);
    const title = json.title;
    (0, helpers_1.checkType_String)(t, title[titleLang1]);
    t.is(title[titleLang1], titleStr1);
    (0, helpers_1.checkType_String)(t, title[titleLang2]);
    t.is(title[titleLang2], titleStr2);
});
(0, ava_1.default)("JSON DESERIALIZE: Metadata.Title => string", (t) => {
    const json = {};
    json.title = titleStr1;
    (0, helpers_1.logJSON)(json);
    const md = (0, serializable_1.TaJsonDeserialize)(json, metadata_1.Metadata);
    (0, helpers_1.inspect)(md);
    (0, helpers_1.checkType_String)(t, md.Title);
    t.is(md.Title, titleStr1);
});
(0, ava_1.default)("JSON DESERIALIZE: Metadata.Title => string-lang", (t) => {
    const json = {};
    json.title = titleLangStr1;
    (0, helpers_1.logJSON)(json);
    const md = (0, serializable_1.TaJsonDeserialize)(json, metadata_1.Metadata);
    (0, helpers_1.inspect)(md);
    (0, helpers_1.checkType_Object)(t, md.Title);
    (0, helpers_1.checkType_String)(t, md.Title[titleLang1]);
    t.is(md.Title[titleLang1], titleStr1);
    (0, helpers_1.checkType_String)(t, md.Title[titleLang2]);
    t.is(md.Title[titleLang2], titleStr2);
});
//# sourceMappingURL=test-JSON-Title.js.map