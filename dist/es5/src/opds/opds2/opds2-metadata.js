"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSMetadata = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var metadata_1 = require("r2-shared-js/dist/es5/src/models/metadata");
var OPDSMetadata = (function (_super) {
    (0, tslib_1.__extends)(OPDSMetadata, _super);
    function OPDSMetadata() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    (0, tslib_1.__decorate)([
        (0, ta_json_x_1.JsonProperty)("numberOfItems"),
        (0, tslib_1.__metadata)("design:type", Number)
    ], OPDSMetadata.prototype, "NumberOfItems", void 0);
    (0, tslib_1.__decorate)([
        (0, ta_json_x_1.JsonProperty)("itemsPerPage"),
        (0, tslib_1.__metadata)("design:type", Number)
    ], OPDSMetadata.prototype, "ItemsPerPage", void 0);
    (0, tslib_1.__decorate)([
        (0, ta_json_x_1.JsonProperty)("currentPage"),
        (0, tslib_1.__metadata)("design:type", Number)
    ], OPDSMetadata.prototype, "CurrentPage", void 0);
    OPDSMetadata = (0, tslib_1.__decorate)([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSMetadata);
    return OPDSMetadata;
}(metadata_1.Metadata));
exports.OPDSMetadata = OPDSMetadata;
//# sourceMappingURL=opds2-metadata.js.map