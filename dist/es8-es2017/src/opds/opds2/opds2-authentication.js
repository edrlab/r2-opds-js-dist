"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSAuthentication = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const opds2_authentication_labels_1 = require("./opds2-authentication-labels");
const opds2_link_1 = require("./opds2-link");
const LINKS_JSON_PROP = "links";
let OPDSAuthentication = class OPDSAuthentication {
    _OnDeserialized() {
        if (!this.Type) {
            console.log("OPDSAuthentication.Type is not set!");
        }
    }
};
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("type"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDSAuthentication.prototype, "Type", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(LINKS_JSON_PROP),
    (0, ta_json_x_1.JsonElementType)(opds2_link_1.OPDSLink),
    (0, tslib_1.__metadata)("design:type", Array)
], OPDSAuthentication.prototype, "Links", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)("labels"),
    (0, tslib_1.__metadata)("design:type", opds2_authentication_labels_1.OPDSAuthenticationLabels)
], OPDSAuthentication.prototype, "Labels", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.OnDeserialized)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], OPDSAuthentication.prototype, "_OnDeserialized", null);
OPDSAuthentication = (0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonObject)()
], OPDSAuthentication);
exports.OPDSAuthentication = OPDSAuthentication;
//# sourceMappingURL=opds2-authentication.js.map