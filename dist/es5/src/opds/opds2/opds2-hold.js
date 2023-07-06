"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSHold = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var OPDSHold = exports.OPDSHold = (function () {
    function OPDSHold() {
    }
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("total"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSHold.prototype, "Total", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("position"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSHold.prototype, "Position", void 0);
    return OPDSHold;
}());
//# sourceMappingURL=opds2-hold.js.map