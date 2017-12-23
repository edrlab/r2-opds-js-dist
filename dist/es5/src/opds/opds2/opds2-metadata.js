"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ta_json_1 = require("ta-json");
var opds2_contributor_1 = require("./opds2-contributor");
var OPDSMetadata = (function () {
    function OPDSMetadata() {
    }
    OPDSMetadata.prototype._OnDeserialized = function () {
        if (!this.Title) {
            console.log("OPDSMetadata.Title is not set!");
        }
    };
    tslib_1.__decorate([
        ta_json_1.JsonProperty("author"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSMetadata.prototype, "Author", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("@type"),
        tslib_1.__metadata("design:type", String)
    ], OPDSMetadata.prototype, "RDFType", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("title"),
        tslib_1.__metadata("design:type", String)
    ], OPDSMetadata.prototype, "Title", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("numberOfItems"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSMetadata.prototype, "NumberOfItems", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("itemsPerPage"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSMetadata.prototype, "ItemsPerPage", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("currentPage"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSMetadata.prototype, "CurrentPage", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("modified"),
        tslib_1.__metadata("design:type", Date)
    ], OPDSMetadata.prototype, "Modified", void 0);
    tslib_1.__decorate([
        ta_json_1.OnDeserialized(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSMetadata.prototype, "_OnDeserialized", null);
    OPDSMetadata = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSMetadata);
    return OPDSMetadata;
}());
exports.OPDSMetadata = OPDSMetadata;
//# sourceMappingURL=opds2-metadata.js.map