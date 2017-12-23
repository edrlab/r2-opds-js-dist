"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ta_json_1 = require("ta-json");
var opds2_link_1 = require("./opds2-link");
var opds2_metadata_1 = require("./opds2-metadata");
var OPDSFacet = (function () {
    function OPDSFacet() {
    }
    OPDSFacet.prototype._OnDeserialized = function () {
        if (!this.Metadata) {
            console.log("OPDSFacet.Metadata is not set!");
        }
        if (!this.Links) {
            console.log("OPDSFacet.Links is not set!");
        }
    };
    tslib_1.__decorate([
        ta_json_1.JsonProperty("metadata"),
        tslib_1.__metadata("design:type", opds2_metadata_1.OPDSMetadata)
    ], OPDSFacet.prototype, "Metadata", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("links"),
        ta_json_1.JsonElementType(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSFacet.prototype, "Links", void 0);
    tslib_1.__decorate([
        ta_json_1.OnDeserialized(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSFacet.prototype, "_OnDeserialized", null);
    OPDSFacet = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSFacet);
    return OPDSFacet;
}());
exports.OPDSFacet = OPDSFacet;
//# sourceMappingURL=opds2-facet.js.map