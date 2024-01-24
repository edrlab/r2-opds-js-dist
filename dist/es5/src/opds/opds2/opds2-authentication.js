"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSAuthentication = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var opds2_authentication_labels_1 = require("./opds2-authentication-labels");
var opds2_link_1 = require("./opds2-link");
var LINKS_JSON_PROP = "links";
var OPDSAuthentication = (function () {
    function OPDSAuthentication() {
    }
    OPDSAuthentication.prototype._OnDeserialized = function () {
        if (!this.Type) {
            console.log("OPDSAuthentication.Type is not set!");
        }
    };
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("type"),
        tslib_1.__metadata("design:type", String)
    ], OPDSAuthentication.prototype, "Type", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(LINKS_JSON_PROP),
        (0, ta_json_x_1.JsonElementType)(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSAuthentication.prototype, "Links", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("labels"),
        tslib_1.__metadata("design:type", opds2_authentication_labels_1.OPDSAuthenticationLabels)
    ], OPDSAuthentication.prototype, "Labels", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.OnDeserialized)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSAuthentication.prototype, "_OnDeserialized", null);
    OPDSAuthentication = tslib_1.__decorate([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSAuthentication);
    return OPDSAuthentication;
}());
exports.OPDSAuthentication = OPDSAuthentication;
//# sourceMappingURL=opds2-authentication.js.map