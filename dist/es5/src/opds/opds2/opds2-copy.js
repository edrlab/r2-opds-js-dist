"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSCopy = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var OPDSCopy = (function () {
    function OPDSCopy() {
    }
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("total"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSCopy.prototype, "Total", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("available"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSCopy.prototype, "Available", void 0);
    return OPDSCopy;
}());
exports.OPDSCopy = OPDSCopy;
//# sourceMappingURL=opds2-copy.js.map