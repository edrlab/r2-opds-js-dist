"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSAuthenticationDoc = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var opds2_authentication_1 = require("./opds2-authentication");
var opds2_link_1 = require("./opds2-link");
var AUTHENTICATION_JSON_PROP = "authentication";
var LINKS_JSON_PROP = "links";
var OPDSAuthenticationDoc = (function () {
    function OPDSAuthenticationDoc() {
    }
    OPDSAuthenticationDoc.prototype._OnDeserialized = function () {
        if (!this.Authentication) {
            console.log("OPDSAuthenticationDoc.Authentication is not set!");
        }
        if (!this.Title) {
            console.log("OPDSAuthenticationDoc.Title is not set!");
        }
        if (!this.Id) {
            console.log("OPDSAuthenticationDoc.Id is not set!");
        }
    };
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("title"),
        tslib_1.__metadata("design:type", String)
    ], OPDSAuthenticationDoc.prototype, "Title", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("id"),
        tslib_1.__metadata("design:type", String)
    ], OPDSAuthenticationDoc.prototype, "Id", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("description"),
        tslib_1.__metadata("design:type", String)
    ], OPDSAuthenticationDoc.prototype, "Description", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(LINKS_JSON_PROP),
        (0, ta_json_x_1.JsonElementType)(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSAuthenticationDoc.prototype, "Links", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(AUTHENTICATION_JSON_PROP),
        (0, ta_json_x_1.JsonElementType)(opds2_authentication_1.OPDSAuthentication),
        tslib_1.__metadata("design:type", Array)
    ], OPDSAuthenticationDoc.prototype, "Authentication", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.OnDeserialized)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSAuthenticationDoc.prototype, "_OnDeserialized", null);
    OPDSAuthenticationDoc = tslib_1.__decorate([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSAuthenticationDoc);
    return OPDSAuthenticationDoc;
}());
exports.OPDSAuthenticationDoc = OPDSAuthenticationDoc;
//# sourceMappingURL=opds2-authentication-doc.js.map