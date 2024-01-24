"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSGroup = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const opds2_link_1 = require("./opds2-link");
const opds2_metadata_1 = require("./opds2-metadata");
const opds2_publication_1 = require("./opds2-publication");
const METADATA_JSON_PROP = "metadata";
const PUBLICATIONS_JSON_PROP = "publications";
const LINKS_JSON_PROP = "links";
const NAVIGATION_JSON_PROP = "navigation";
let OPDSGroup = class OPDSGroup {
};
exports.OPDSGroup = OPDSGroup;
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
exports.OPDSGroup = OPDSGroup = tslib_1.__decorate([
    (0, ta_json_x_1.JsonObject)()
], OPDSGroup);
//# sourceMappingURL=opds2-group.js.map