"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metadata_collection_1 = require("r2-shared-js/dist/es5/src/models/metadata-collection");
var ta_json_1 = require("ta-json");
var opds2_link_1 = require("./opds2-link");
var OPDSCollection = (function (_super) {
    tslib_1.__extends(OPDSCollection, _super);
    function OPDSCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ta_json_1.JsonProperty("links"),
        ta_json_1.JsonElementType(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSCollection.prototype, "Links", void 0);
    OPDSCollection = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSCollection);
    return OPDSCollection;
}(metadata_collection_1.Collection));
exports.OPDSCollection = OPDSCollection;
//# sourceMappingURL=opds2-collection.js.map