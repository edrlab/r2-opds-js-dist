"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const xmldom = require("xmldom");
const serializable_1 = require("r2-lcp-js/dist/es7-es2016/src/serializable");
const xml_js_mapper_1 = require("r2-utils-js/dist/es7-es2016/src/_utils/xml-js-mapper");
const init_globals_1 = require("../src/opds/init-globals");
const opds_1 = require("../src/opds/opds1/opds");
const opds2_metadata_1 = require("../src/opds/opds2/opds2-metadata");
const helpers_1 = require("./helpers");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
const num = 12345.67890;
const numSTR = "12345.6789";
ava_1.default("JSON SERIALIZE: Metadata.ItemsPerPage => Number", (t) => {
    const md = new opds2_metadata_1.OPDSMetadata();
    md.ItemsPerPage = num;
    helpers_1.inspect(md);
    const json = serializable_1.TaJsonSerialize(md);
    helpers_1.logJSON(json);
    helpers_1.checkType_Number(t, json.itemsPerPage);
    t.is(json.itemsPerPage, num);
});
ava_1.default("JSON DESERIALIZE: Metadata.ItemsPerPage => Number", (t) => {
    const json = {};
    json.itemsPerPage = num;
    helpers_1.logJSON(json);
    const md = serializable_1.TaJsonDeserialize(json, opds2_metadata_1.OPDSMetadata);
    helpers_1.inspect(md);
    t.true(typeof md.AdditionalJSON === "undefined");
    helpers_1.checkType_Number(t, md.ItemsPerPage);
    helpers_1.checkNumber(t, md.ItemsPerPage, num);
});
ava_1.default("XML DESERIALIZE: OPDS opensearch:itemsPerPage => Number", (t) => {
    const xmlStr = `<opds xmlns="http://opds-spec.org/2010/catalog" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/">
            <opensearch:itemsPerPage>${numSTR}</opensearch:itemsPerPage>
        </opds>`;
    console.log(xmlStr);
    const xml = new xmldom.DOMParser().parseFromString(xmlStr);
    const opds = xml_js_mapper_1.XML.deserialize(xml, opds_1.OPDS);
    helpers_1.inspect(opds);
    helpers_1.checkType_Number(t, opds.OpensearchItemsPerPage);
    helpers_1.checkNumber(t, opds.OpensearchItemsPerPage, num);
});
//# sourceMappingURL=test-JSON-XML-Number.js.map