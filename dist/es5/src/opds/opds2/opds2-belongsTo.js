"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ta_json_1 = require("ta-json");
var opds2_collection_1 = require("./opds2-collection");
var OPDSBelongsTo = (function () {
    function OPDSBelongsTo() {
    }
    tslib_1.__decorate([
        ta_json_1.JsonProperty("series"),
        ta_json_1.JsonElementType(opds2_collection_1.OPDSCollection),
        tslib_1.__metadata("design:type", Array)
    ], OPDSBelongsTo.prototype, "Series", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("collection"),
        ta_json_1.JsonElementType(opds2_collection_1.OPDSCollection),
        tslib_1.__metadata("design:type", Array)
    ], OPDSBelongsTo.prototype, "Collection", void 0);
    OPDSBelongsTo = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSBelongsTo);
    return OPDSBelongsTo;
}());
exports.OPDSBelongsTo = OPDSBelongsTo;
//# sourceMappingURL=opds2-belongsTo.js.map