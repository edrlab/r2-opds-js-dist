"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSAuthenticationLabels = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var OPDSAuthenticationLabels = (function () {
    function OPDSAuthenticationLabels() {
    }
    OPDSAuthenticationLabels.prototype._OnDeserialized = function () {
    };
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("login"),
        tslib_1.__metadata("design:type", String)
    ], OPDSAuthenticationLabels.prototype, "Login", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("password"),
        tslib_1.__metadata("design:type", String)
    ], OPDSAuthenticationLabels.prototype, "Password", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.OnDeserialized)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSAuthenticationLabels.prototype, "_OnDeserialized", null);
    OPDSAuthenticationLabels = tslib_1.__decorate([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSAuthenticationLabels);
    return OPDSAuthenticationLabels;
}());
exports.OPDSAuthenticationLabels = OPDSAuthenticationLabels;
//# sourceMappingURL=opds2-authentication-labels.js.map