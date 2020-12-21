"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var xmldom = require("xmldom");
var serializable_1 = require("r2-lcp-js/dist/es5/src/serializable");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var init_globals_1 = require("../src/opds/init-globals");
var opds_1 = require("../src/opds/opds1/opds");
var opds2_metadata_1 = require("../src/opds/opds2/opds2-metadata");
var helpers_1 = require("./helpers");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
var num = 12345.67890;
var numSTR = "12345.6789";
ava_1.default("JSON SERIALIZE: Metadata.ItemsPerPage => Number", function (t) {
    var md = new opds2_metadata_1.OPDSMetadata();
    md.ItemsPerPage = num;
    helpers_1.inspect(md);
    var json = serializable_1.TaJsonSerialize(md);
    helpers_1.logJSON(json);
    helpers_1.checkType_Number(t, json.itemsPerPage);
    t.is(json.itemsPerPage, num);
});
ava_1.default("JSON DESERIALIZE: Metadata.ItemsPerPage => Number", function (t) {
    var json = {};
    json.itemsPerPage = num;
    helpers_1.logJSON(json);
    var md = serializable_1.TaJsonDeserialize(json, opds2_metadata_1.OPDSMetadata);
    helpers_1.inspect(md);
    t.true(typeof md.AdditionalJSON === "undefined");
    helpers_1.checkType_Number(t, md.ItemsPerPage);
    helpers_1.checkNumber(t, md.ItemsPerPage, num);
});
ava_1.default("XML DESERIALIZE: OPDS opensearch:itemsPerPage => Number", function (t) {
    var xmlStr = "<opds xmlns=\"http://opds-spec.org/2010/catalog\" xmlns:opensearch=\"http://a9.com/-/spec/opensearch/1.1/\">\n            <opensearch:itemsPerPage>" + numSTR + "</opensearch:itemsPerPage>\n        </opds>";
    console.log(xmlStr);
    var xml = new xmldom.DOMParser().parseFromString(xmlStr);
    var opds = xml_js_mapper_1.XML.deserialize(xml, opds_1.OPDS);
    helpers_1.inspect(opds);
    helpers_1.checkType_Number(t, opds.OpensearchItemsPerPage);
    helpers_1.checkNumber(t, opds.OpensearchItemsPerPage, num);
});
//# sourceMappingURL=test-JSON-XML-Number.js.map