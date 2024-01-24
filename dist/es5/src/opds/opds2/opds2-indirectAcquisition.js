"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSIndirectAcquisition = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var OPDSIndirectAcquisition = (function () {
    function OPDSIndirectAcquisition() {
    }
    OPDSIndirectAcquisition.prototype._OnDeserialized = function () {
        if (!this.TypeAcquisition) {
            console.log("OPDSIndirectAcquisition.TypeAcquisition is not set!");
        }
    };
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("type"),
        tslib_1.__metadata("design:type", String)
    ], OPDSIndirectAcquisition.prototype, "TypeAcquisition", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("child"),
        (0, ta_json_x_1.JsonElementType)(OPDSIndirectAcquisition),
        tslib_1.__metadata("design:type", Array)
    ], OPDSIndirectAcquisition.prototype, "Children", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.OnDeserialized)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSIndirectAcquisition.prototype, "_OnDeserialized", null);
    OPDSIndirectAcquisition = tslib_1.__decorate([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSIndirectAcquisition);
    return OPDSIndirectAcquisition;
}());
exports.OPDSIndirectAcquisition = OPDSIndirectAcquisition;
//# sourceMappingURL=opds2-indirectAcquisition.js.map