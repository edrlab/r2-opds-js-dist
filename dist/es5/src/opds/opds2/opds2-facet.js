"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSFacet = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var opds2_link_1 = require("./opds2-link");
var opds2_metadata_1 = require("./opds2-metadata");
var METADATA_JSON_PROP = "metadata";
var LINKS_JSON_PROP = "links";
var OPDSFacet = (function () {
    function OPDSFacet() {
    }
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(METADATA_JSON_PROP),
        tslib_1.__metadata("design:type", opds2_metadata_1.OPDSMetadata)
    ], OPDSFacet.prototype, "Metadata", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(LINKS_JSON_PROP),
        (0, ta_json_x_1.JsonElementType)(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSFacet.prototype, "Links", void 0);
    OPDSFacet = tslib_1.__decorate([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSFacet);
    return OPDSFacet;
}());
exports.OPDSFacet = OPDSFacet;
//# sourceMappingURL=opds2-facet.js.map