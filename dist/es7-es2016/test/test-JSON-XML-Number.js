"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const xmldom = require("@xmldom/xmldom");
const serializable_1 = require("r2-lcp-js/dist/es7-es2016/src/serializable");
const xml_js_mapper_1 = require("r2-utils-js/dist/es7-es2016/src/_utils/xml-js-mapper");
const init_globals_1 = require("../src/opds/init-globals");
const opds_1 = require("../src/opds/opds1/opds");
const opds2_metadata_1 = require("../src/opds/opds2/opds2-metadata");
const helpers_1 = require("./helpers");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
const num = 12345.6789;
const numSTR = "12345.6789";
(0, ava_1.default)("JSON SERIALIZE: Metadata.ItemsPerPage => Number", (t) => {
    const md = new opds2_metadata_1.OPDSMetadata();
    md.ItemsPerPage = num;
    (0, helpers_1.inspect)(md);
    const json = (0, serializable_1.TaJsonSerialize)(md);
    (0, helpers_1.logJSON)(json);
    (0, helpers_1.checkType_Number)(t, json.itemsPerPage);
    t.is(json.itemsPerPage, num);
});
(0, ava_1.default)("JSON DESERIALIZE: Metadata.ItemsPerPage => Number", (t) => {
    const json = {};
    json.itemsPerPage = num;
    (0, helpers_1.logJSON)(json);
    const md = (0, serializable_1.TaJsonDeserialize)(json, opds2_metadata_1.OPDSMetadata);
    (0, helpers_1.inspect)(md);
    t.true(typeof md.AdditionalJSON === "undefined");
    (0, helpers_1.checkType_Number)(t, md.ItemsPerPage);
    (0, helpers_1.checkNumber)(t, md.ItemsPerPage, num);
});
(0, ava_1.default)("XML DESERIALIZE: OPDS opensearch:itemsPerPage => Number", (t) => {
    const xmlStr = `<opds xmlns="http://opds-spec.org/2010/catalog" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">
            <opensearch:itemsPerPage>${numSTR}</opensearch:itemsPerPage>
        </opds>`;
    console.log(xmlStr);
    const xml = new xmldom.DOMParser().parseFromString(xmlStr, "application/xml");
    const opds = xml_js_mapper_1.XML.deserialize(xml, opds_1.OPDS);
    (0, helpers_1.inspect)(opds);
    (0, helpers_1.checkType_Number)(t, opds.OpensearchItemsPerPage);
    (0, helpers_1.checkNumber)(t, opds.OpensearchItemsPerPage, num);
});
//# sourceMappingURL=test-JSON-XML-Number.js.map