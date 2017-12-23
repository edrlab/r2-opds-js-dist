"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ta_json_1 = require("ta-json");
var opds2_link_1 = require("./opds2-link");
var OPDSCollection = (function () {
    function OPDSCollection() {
    }
    OPDSCollection.prototype._OnDeserialized = function () {
        if (!this.Name) {
            console.log("OPDSCollection.Name is not set!");
        }
    };
    tslib_1.__decorate([
        ta_json_1.JsonProperty("name"),
        tslib_1.__metadata("design:type", String)
    ], OPDSCollection.prototype, "Name", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("sort_as"),
        tslib_1.__metadata("design:type", String)
    ], OPDSCollection.prototype, "SortAs", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("identifier"),
        tslib_1.__metadata("design:type", String)
    ], OPDSCollection.prototype, "Identifier", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("position"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSCollection.prototype, "Position", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("links"),
        ta_json_1.JsonElementType(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSCollection.prototype, "Links", void 0);
    tslib_1.__decorate([
        ta_json_1.OnDeserialized(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSCollection.prototype, "_OnDeserialized", null);
    OPDSCollection = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSCollection);
    return OPDSCollection;
}());
exports.OPDSCollection = OPDSCollection;
//# sourceMappingURL=opds2-collection.js.map