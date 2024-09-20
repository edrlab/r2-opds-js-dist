"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGlobalConverters_OPDS = initGlobalConverters_OPDS;
exports.initGlobalConverters_GENERIC = initGlobalConverters_GENERIC;
var ta_json_x_1 = require("ta-json-x");
var ta_json_date_converter_1 = require("r2-utils-js/dist/es5/src/_utils/ta-json-date-converter");
var ta_json_number_converter_1 = require("r2-utils-js/dist/es5/src/_utils/ta-json-number-converter");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
function initGlobalConverters_OPDS() {
}
function initGlobalConverters_GENERIC() {
    ta_json_x_1.propertyConverters.set(Buffer, new ta_json_x_1.BufferConverter());
    ta_json_x_1.propertyConverters.set(Date, new ta_json_date_converter_1.JsonDateConverter());
    ta_json_x_1.propertyConverters.set(Number, new ta_json_number_converter_1.JsonNumberConverter());
    xml_js_mapper_1.propertyConverters.set(Buffer, new xml_js_mapper_1.BufferConverter());
    xml_js_mapper_1.propertyConverters.set(Date, new xml_js_mapper_1.DateConverter());
    xml_js_mapper_1.propertyConverters.set(Number, new xml_js_mapper_1.NumberConverter());
}
//# sourceMappingURL=init-globals.js.map