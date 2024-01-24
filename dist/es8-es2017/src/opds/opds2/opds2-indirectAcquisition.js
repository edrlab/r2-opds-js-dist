"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSIndirectAcquisition = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
let OPDSIndirectAcquisition = class OPDSIndirectAcquisition {
    _OnDeserialized() {
        if (!this.TypeAcquisition) {
            console.log("OPDSIndirectAcquisition.TypeAcquisition is not set!");
        }
    }
};
exports.OPDSIndirectAcquisition = OPDSIndirectAcquisition;
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
exports.OPDSIndirectAcquisition = OPDSIndirectAcquisition = tslib_1.__decorate([
    (0, ta_json_x_1.JsonObject)()
], OPDSIndirectAcquisition);
//# sourceMappingURL=opds2-indirectAcquisition.js.map