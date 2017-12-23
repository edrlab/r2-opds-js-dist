"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_1 = require("ta-json");
const opds2_link_1 = require("./opds2-link");
const opds2_metadata_1 = require("./opds2-metadata");
let OPDSFacet = class OPDSFacet {
    _OnDeserialized() {
        if (!this.Metadata) {
            console.log("OPDSFacet.Metadata is not set!");
        }
        if (!this.Links) {
            console.log("OPDSFacet.Links is not set!");
        }
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
exports.OPDSFacet = OPDSFacet;
//# sourceMappingURL=opds2-facet.js.map