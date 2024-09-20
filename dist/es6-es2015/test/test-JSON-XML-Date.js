"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const xmldom = require("@xmldom/xmldom");
const serializable_1 = require("r2-lcp-js/dist/es6-es2015/src/serializable");
const metadata_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata");
const xml_js_mapper_1 = require("r2-utils-js/dist/es6-es2015/src/_utils/xml-js-mapper");
const init_globals_1 = require("../src/opds/init-globals");
const opds_entry_1 = require("../src/opds/opds1/opds-entry");
const helpers_1 = require("./helpers");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
const date = new Date();
date.setUTCFullYear(2000, 11, 31);
date.setUTCHours(23, 59, 59, 999);
const dateSTR = "2000-12-31T23:59:59.999Z";
(0, ava_1.default)("JSON SERIALIZE: Metadata.Modified => Date", (t) => {
    const md = new metadata_1.Metadata();
    md.Modified = date;
    (0, helpers_1.inspect)(md);
    const json = (0, serializable_1.TaJsonSerialize)(md);
    (0, helpers_1.logJSON)(json);
    (0, helpers_1.checkType_String)(t, json.modified);
    t.is(json.modified, dateSTR);
});
(0, ava_1.default)("JSON DESERIALIZE: Metadata.Modified => Date", (t) => {
    const json = {};
    json.modified = dateSTR;
    (0, helpers_1.logJSON)(json);
    const md = (0, serializable_1.TaJsonDeserialize)(json, metadata_1.Metadata);
    (0, helpers_1.inspect)(md);
    (0, helpers_1.checkType)(t, md.Modified, Date);
    (0, helpers_1.checkDate)(t, md.Modified, date);
});
(0, ava_1.default)("XML DESERIALIZE: OPDS Entry.Updated => Date", (t) => {
    const xmlStr = `<entry xmlns="http://opds-spec.org/2010/catalog" xmlns:atom="http://www.w3.org/2005/Atom">
            <atom:updated>${dateSTR}</atom:updated>
        </entry>`;
    console.log(xmlStr);
    const xml = new xmldom.DOMParser().parseFromString(xmlStr, "application/xml");
    const md = xml_js_mapper_1.XML.deserialize(xml, opds_entry_1.Entry);
    (0, helpers_1.inspect)(md);
    (0, helpers_1.checkType)(t, md.Updated, Date);
    (0, helpers_1.checkDate)(t, md.Updated, date);
});
//# sourceMappingURL=test-JSON-XML-Date.js.map