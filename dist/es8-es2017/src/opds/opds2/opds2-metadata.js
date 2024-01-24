"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSMetadata = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const metadata_1 = require("r2-shared-js/dist/es8-es2017/src/models/metadata");
let OPDSMetadata = class OPDSMetadata extends metadata_1.Metadata {
};
exports.OPDSMetadata = OPDSMetadata;
tslib_1.__decorate([
    (0, ta_json_x_1.JsonProperty)("numberOfItems"),
    tslib_1.__metadata("design:type", Number)
], OPDSMetadata.prototype, "NumberOfItems", void 0);
tslib_1.__decorate([
    (0, ta_json_x_1.JsonProperty)("itemsPerPage"),
    tslib_1.__metadata("design:type", Number)
], OPDSMetadata.prototype, "ItemsPerPage", void 0);
tslib_1.__decorate([
    (0, ta_json_x_1.JsonProperty)("currentPage"),
    tslib_1.__metadata("design:type", Number)
], OPDSMetadata.prototype, "CurrentPage", void 0);
exports.OPDSMetadata = OPDSMetadata = tslib_1.__decorate([
    (0, ta_json_x_1.JsonObject)()
], OPDSMetadata);
//# sourceMappingURL=opds2-metadata.js.map