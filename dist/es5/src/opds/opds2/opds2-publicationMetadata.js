"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metadata_1 = require("r2-shared-js/dist/es5/src/models/metadata");
var ta_json_1 = require("ta-json");
var opds2_contributor_1 = require("./opds2-contributor");
var OPDSPublicationMetadata = (function (_super) {
    tslib_1.__extends(OPDSPublicationMetadata, _super);
    function OPDSPublicationMetadata() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ta_json_1.JsonProperty("author"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Author", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("translator"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Translator", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("editor"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Editor", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("artist"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Artist", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("illustrator"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Illustrator", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("letterer"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Letterer", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("penciler"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Penciler", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("colorist"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Colorist", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("inker"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Inker", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("narrator"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Narrator", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("contributor"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "OPDSContributor", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("publisher"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Publisher", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("imprint"),
        ta_json_1.JsonElementType(opds2_contributor_1.OPDSContributor),
        tslib_1.__metadata("design:type", Array)
    ], OPDSPublicationMetadata.prototype, "Imprint", void 0);
    OPDSPublicationMetadata = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSPublicationMetadata);
    return OPDSPublicationMetadata;
}(metadata_1.Metadata));
exports.OPDSPublicationMetadata = OPDSPublicationMetadata;
//# sourceMappingURL=opds2-publicationMetadata.js.map