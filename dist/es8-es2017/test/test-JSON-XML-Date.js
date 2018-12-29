"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("r2-shared-js/dist/es8-es2017/src/models/metadata");
const xml_js_mapper_1 = require("r2-utils-js/dist/es8-es2017/src/_utils/xml-js-mapper");
const ava_1 = require("ava");
const ta_json_x_1 = require("ta-json-x");
const xmldom = require("xmldom");
const init_globals_1 = require("../src/opds/init-globals");
const opds_entry_1 = require("../src/opds/opds1/opds-entry");
const helpers_1 = require("./helpers");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
const date = new Date();
date.setUTCFullYear(2000, 11, 31);
date.setUTCHours(23, 59, 59, 999);
const dateSTR = "2000-12-31T23:59:59.999Z";
ava_1.default("JSON SERIALIZE: Metadata.Modified => Date", (t) => {
    const md = new metadata_1.Metadata();
    md.Modified = date;
    helpers_1.inspect(md);
    const json = ta_json_x_1.JSON.serialize(md);
    helpers_1.logJSON(json);
    helpers_1.checkType_String(t, json.modified);
    t.is(json.modified, dateSTR);
});
ava_1.default("JSON DESERIALIZE: Metadata.Modified => Date", (t) => {
    const json = {};
    json.modified = dateSTR;
    helpers_1.logJSON(json);
    const md = ta_json_x_1.JSON.deserialize(json, metadata_1.Metadata);
    helpers_1.inspect(md);
    helpers_1.checkType(t, md.Modified, Date);
    helpers_1.checkDate(t, md.Modified, date);
});
ava_1.default("XML DESERIALIZE: OPDS Entry.Updated => Date", (t) => {
    const xmlStr = `<entry xmlns="http://opds-spec.org/2010/catalog" xmlns:atom="http://www.w3.org/2005/Atom">
            <atom:updated>${dateSTR}</atom:updated>
        </entry>`;
    console.log(xmlStr);
    const xml = new xmldom.DOMParser().parseFromString(xmlStr);
    const md = xml_js_mapper_1.XML.deserialize(xml, opds_entry_1.Entry);
    helpers_1.inspect(md);
    helpers_1.checkType(t, md.Updated, Date);
    helpers_1.checkDate(t, md.Updated, date);
});
//# sourceMappingURL=test-JSON-XML-Date.js.map