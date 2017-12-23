"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ta_json_date_converter_1 = require("r2-utils-js/dist/es5/src/_utils/ta-json-date-converter");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var ta_json_1 = require("ta-json");
var opds2_collection_1 = require("./opds/opds2/opds2-collection");
var opds2_collection_json_converter_1 = require("./opds/opds2/opds2-collection-json-converter");
function initGlobals() {
    ta_json_1.propertyConverters.set(Buffer, new ta_json_1.BufferConverter());
    ta_json_1.propertyConverters.set(Date, new ta_json_date_converter_1.JsonDateConverter());
    ta_json_1.propertyConverters.set(opds2_collection_1.OPDSCollection, new opds2_collection_json_converter_1.JsonOPDSCollectionConverter());
    xml_js_mapper_1.propertyConverters.set(Buffer, new xml_js_mapper_1.BufferConverter());
    xml_js_mapper_1.propertyConverters.set(Date, new xml_js_mapper_1.DateConverter());
}
exports.initGlobals = initGlobals;
//# sourceMappingURL=init-globals.js.map