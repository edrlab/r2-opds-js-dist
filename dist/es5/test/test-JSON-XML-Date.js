"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var ava_1 = require("ava");
var ta_json_1 = require("ta-json");
var xmldom = require("xmldom");
var init_globals_1 = require("../src/opds/init-globals");
var opds_entry_1 = require("../src/opds/opds1/opds-entry");
var opds2_publicationMetadata_1 = require("../src/opds/opds2/opds2-publicationMetadata");
var helpers_1 = require("./helpers");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
var date = new Date();
date.setUTCFullYear(2000, 11, 31);
date.setUTCHours(23, 59, 59, 999);
var dateSTR = "2000-12-31T23:59:59.999Z";
ava_1.test("JSON SERIALIZE: OPDSPublicationMetadata.Modified => Date", function (t) {
    var md = new opds2_publicationMetadata_1.OPDSPublicationMetadata();
    md.Modified = date;
    helpers_1.inspect(md);
    var json = ta_json_1.JSON.serialize(md);
    helpers_1.logJSON(json);
    helpers_1.checkType_String(t, json.modified);
    t.is(json.modified, dateSTR);
});
ava_1.test("JSON DESERIALIZE: OPDSPublicationMetadata.Modified => Date", function (t) {
    var json = {};
    json.modified = dateSTR;
    helpers_1.logJSON(json);
    var md = ta_json_1.JSON.deserialize(json, opds2_publicationMetadata_1.OPDSPublicationMetadata);
    helpers_1.inspect(md);
    helpers_1.checkType(t, md.Modified, Date);
    helpers_1.checkDate(t, md.Modified, date);
});
ava_1.test("XML DESERIALIZE: OPDS Entry.Updated => Date", function (t) {
    var xmlStr = "<entry xmlns=\"http://opds-spec.org/2010/catalog\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n            <atom:updated>" + dateSTR + "</atom:updated>\n        </entry>";
    console.log(xmlStr);
    var xml = new xmldom.DOMParser().parseFromString(xmlStr);
    var md = xml_js_mapper_1.XML.deserialize(xml, opds_entry_1.Entry);
    helpers_1.inspect(md);
    helpers_1.checkType(t, md.Updated, Date);
    helpers_1.checkDate(t, md.Updated, date);
});
//# sourceMappingURL=test-JSON-XML-Date.js.map