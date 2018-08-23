"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var publication_link_1 = require("r2-shared-js/dist/es5/src/models/publication-link");
var ta_json_1 = require("ta-json");
var opds2_properties_1 = require("./opds2-properties");
var OPDSLink = (function (_super) {
    tslib_1.__extends(OPDSLink, _super);
    function OPDSLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ta_json_1.JsonProperty("properties"),
        tslib_1.__metadata("design:type", opds2_properties_1.OPDSProperties)
    ], OPDSLink.prototype, "Properties", void 0);
    OPDSLink = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSLink);
    return OPDSLink;
}(publication_link_1.Link));
exports.OPDSLink = OPDSLink;
//# sourceMappingURL=opds2-link.js.map