"use strict";
var OPDSIndirectAcquisition_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSIndirectAcquisition = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
let OPDSIndirectAcquisition = OPDSIndirectAcquisition_1 = class OPDSIndirectAcquisition {
    _OnDeserialized() {
        if (!this.TypeAcquisition) {
            console.log("OPDSIndirectAcquisition.TypeAcquisition is not set!");
        }
    }
};
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("type"),
    tslib_1.__metadata("design:type", String)
], OPDSIndirectAcquisition.prototype, "TypeAcquisition", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("child"),
    ta_json_x_1.JsonElementType(OPDSIndirectAcquisition_1),
    tslib_1.__metadata("design:type", Array)
], OPDSIndirectAcquisition.prototype, "Children", void 0);
tslib_1.__decorate([
    ta_json_x_1.OnDeserialized(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OPDSIndirectAcquisition.prototype, "_OnDeserialized", null);
OPDSIndirectAcquisition = OPDSIndirectAcquisition_1 = tslib_1.__decorate([
    ta_json_x_1.JsonObject()
], OPDSIndirectAcquisition);
exports.OPDSIndirectAcquisition = OPDSIndirectAcquisition;
//# sourceMappingURL=opds2-indirectAcquisition.js.map