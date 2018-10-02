"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metadata_properties_1 = require("r2-shared-js/dist/es5/src/models/metadata-properties");
var ta_json_x_1 = require("ta-json-x");
var opds2_indirectAcquisition_1 = require("./opds2-indirectAcquisition");
var opds2_price_1 = require("./opds2-price");
var OPDSProperties = (function (_super) {
    tslib_1.__extends(OPDSProperties, _super);
    function OPDSProperties() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ta_json_x_1.JsonProperty("numberOfItems"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSProperties.prototype, "NumberOfItems", void 0);
    tslib_1.__decorate([
        ta_json_x_1.JsonProperty("price"),
        tslib_1.__metadata("design:type", opds2_price_1.OPDSPrice)
    ], OPDSProperties.prototype, "Price", void 0);
    tslib_1.__decorate([
        ta_json_x_1.JsonProperty("indirectAcquisition"),
        ta_json_x_1.JsonElementType(opds2_indirectAcquisition_1.OPDSIndirectAcquisition),
        tslib_1.__metadata("design:type", Array)
    ], OPDSProperties.prototype, "IndirectAcquisitions", void 0);
    OPDSProperties = tslib_1.__decorate([
        ta_json_x_1.JsonObject()
    ], OPDSProperties);
    return OPDSProperties;
}(metadata_properties_1.Properties));
exports.OPDSProperties = OPDSProperties;
//# sourceMappingURL=opds2-properties.js.map