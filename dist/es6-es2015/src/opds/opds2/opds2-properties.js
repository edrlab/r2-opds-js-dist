"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSProperties = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const metadata_properties_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata-properties");
const opds2_availability_1 = require("./opds2-availability");
const opds2_copy_1 = require("./opds2-copy");
const opds2_hold_1 = require("./opds2-hold");
const opds2_indirectAcquisition_1 = require("./opds2-indirectAcquisition");
const opds2_price_1 = require("./opds2-price");
let OPDSProperties = class OPDSProperties extends metadata_properties_1.Properties {
};
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("numberOfItems"),
    (0, tslib_1.__metadata)("design:type", Number)
], OPDSProperties.prototype, "NumberOfItems", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("price"),
    (0, tslib_1.__metadata)("design:type", opds2_price_1.OPDSPrice)
], OPDSProperties.prototype, "Price", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("indirectAcquisition"),
    (0, ta_json_x_1.JsonElementType)(opds2_indirectAcquisition_1.OPDSIndirectAcquisition),
    (0, tslib_1.__metadata)("design:type", Array)
], OPDSProperties.prototype, "IndirectAcquisitions", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("holds"),
    (0, tslib_1.__metadata)("design:type", opds2_hold_1.OPDSHold)
], OPDSProperties.prototype, "Holds", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("copies"),
    (0, tslib_1.__metadata)("design:type", opds2_copy_1.OPDSCopy)
], OPDSProperties.prototype, "Copies", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("availability"),
    (0, tslib_1.__metadata)("design:type", opds2_availability_1.OPDSAvailability)
], OPDSProperties.prototype, "Availability", void 0);
OPDSProperties = (0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonObject)()
], OPDSProperties);
exports.OPDSProperties = OPDSProperties;
//# sourceMappingURL=opds2-properties.js.map