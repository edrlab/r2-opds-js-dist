"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSGroup = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var opds2_link_1 = require("./opds2-link");
var opds2_metadata_1 = require("./opds2-metadata");
var opds2_publication_1 = require("./opds2-publication");
var METADATA_JSON_PROP = "metadata";
var PUBLICATIONS_JSON_PROP = "publications";
var LINKS_JSON_PROP = "links";
var NAVIGATION_JSON_PROP = "navigation";
var OPDSGroup = (function () {
    function OPDSGroup() {
    }
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(METADATA_JSON_PROP),
        tslib_1.__metadata("design:type", opds2_metadata_1.OPDSMetadata)
    ], OPDSGroup.prototype, "Metadata", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(PUBLICATIONS_JSON_PROP),
        (0, ta_json_x_1.JsonElementType)(opds2_publication_1.OPDSPublication),
        tslib_1.__metadata("design:type", Array)
    ], OPDSGroup.prototype, "Publications", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(LINKS_JSON_PROP),
        (0, ta_json_x_1.JsonElementType)(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSGroup.prototype, "Links", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)(NAVIGATION_JSON_PROP),
        (0, ta_json_x_1.JsonElementType)(opds2_link_1.OPDSLink),
        tslib_1.__metadata("design:type", Array)
    ], OPDSGroup.prototype, "Navigation", void 0);
    OPDSGroup = tslib_1.__decorate([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSGroup);
    return OPDSGroup;
}());
exports.OPDSGroup = OPDSGroup;
//# sourceMappingURL=opds2-group.js.map