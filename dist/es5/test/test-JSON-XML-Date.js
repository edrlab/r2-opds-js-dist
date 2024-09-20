"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var xmldom = require("@xmldom/xmldom");
var serializable_1 = require("r2-lcp-js/dist/es5/src/serializable");
var metadata_1 = require("r2-shared-js/dist/es5/src/models/metadata");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var init_globals_1 = require("../src/opds/init-globals");
var opds_entry_1 = require("../src/opds/opds1/opds-entry");
var helpers_1 = require("./helpers");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
var date = new Date();
date.setUTCFullYear(2000, 11, 31);
date.setUTCHours(23, 59, 59, 999);
var dateSTR = "2000-12-31T23:59:59.999Z";
(0, ava_1.default)("JSON SERIALIZE: Metadata.Modified => Date", function (t) {
    var md = new metadata_1.Metadata();
    md.Modified = date;
    (0, helpers_1.inspect)(md);
    var json = (0, serializable_1.TaJsonSerialize)(md);
    (0, helpers_1.logJSON)(json);
    (0, helpers_1.checkType_String)(t, json.modified);
    t.is(json.modified, dateSTR);
});
(0, ava_1.default)("JSON DESERIALIZE: Metadata.Modified => Date", function (t) {
    var json = {};
    json.modified = dateSTR;
    (0, helpers_1.logJSON)(json);
    var md = (0, serializable_1.TaJsonDeserialize)(json, metadata_1.Metadata);
    (0, helpers_1.inspect)(md);
    (0, helpers_1.checkType)(t, md.Modified, Date);
    (0, helpers_1.checkDate)(t, md.Modified, date);
});
(0, ava_1.default)("XML DESERIALIZE: OPDS Entry.Updated => Date", function (t) {
    var xmlStr = "<entry xmlns=\"http://opds-spec.org/2010/catalog\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n            <atom:updated>".concat(dateSTR, "</atom:updated>\n        </entry>");
    console.log(xmlStr);
    var xml = new xmldom.DOMParser().parseFromString(xmlStr, "application/xml");
    var md = xml_js_mapper_1.XML.deserialize(xml, opds_entry_1.Entry);
    (0, helpers_1.inspect)(md);
    (0, helpers_1.checkType)(t, md.Updated, Date);
    (0, helpers_1.checkDate)(t, md.Updated, date);
});
//# sourceMappingURL=test-JSON-XML-Date.js.map