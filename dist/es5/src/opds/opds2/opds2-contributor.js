"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metadata_contributor_1 = require("r2-shared-js/dist/es5/src/models/metadata-contributor");
var ta_json_x_1 = require("ta-json-x");
var opds2_link_1 = require("./opds2-link");
var OPDSContributor = (function (_super) {
    tslib_1.__extends(OPDSContributor, _super);
    function OPDSContributor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        ta_json_x_1.JsonProperty("links"),
        ta_json_x_1.JsonElementType(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSContributor.prototype, "Links", void 0);
    OPDSContributor = tslib_1.__decorate([
        ta_json_x_1.JsonObject()
    ], OPDSContributor);
    return OPDSContributor;
}(metadata_contributor_1.Contributor));
exports.OPDSContributor = OPDSContributor;
//# sourceMappingURL=opds2-contributor.js.map