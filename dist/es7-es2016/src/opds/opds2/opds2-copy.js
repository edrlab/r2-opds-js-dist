"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSCopy = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
class OPDSCopy {
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("total"),
    (0, tslib_1.__metadata)("design:type", Number)
], OPDSCopy.prototype, "Total", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("available"),
    (0, tslib_1.__metadata)("design:type", Number)
], OPDSCopy.prototype, "Available", void 0);
exports.OPDSCopy = OPDSCopy;
//# sourceMappingURL=opds2-copy.js.map