"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_1 = require("ta-json");
const opds2_collection_1 = require("./opds2-collection");
let OPDSBelongsTo = class OPDSBelongsTo {
};
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
exports.OPDSBelongsTo = OPDSBelongsTo;
//# sourceMappingURL=opds2-belongsTo.js.map