"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSAuthenticationLabels = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
let OPDSAuthenticationLabels = class OPDSAuthenticationLabels {
    _OnDeserialized() {
    }
};
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("login"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDSAuthenticationLabels.prototype, "Login", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("password"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDSAuthenticationLabels.prototype, "Password", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.OnDeserialized)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], OPDSAuthenticationLabels.prototype, "_OnDeserialized", null);
OPDSAuthenticationLabels = (0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonObject)()
], OPDSAuthenticationLabels);
exports.OPDSAuthenticationLabels = OPDSAuthenticationLabels;
//# sourceMappingURL=opds2-authentication-labels.js.map