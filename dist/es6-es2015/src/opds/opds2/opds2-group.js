"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const opds2_link_1 = require("./opds2-link");
const opds2_metadata_1 = require("./opds2-metadata");
const opds2_publication_1 = require("./opds2-publication");
let OPDSGroup = class OPDSGroup {
    _OnDeserialized() {
        if (!this.Metadata) {
            console.log("OPDSGroup.Metadata is not set!");
        }
    }
};
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("metadata"),
    tslib_1.__metadata("design:type", opds2_metadata_1.OPDSMetadata)
], OPDSGroup.prototype, "Metadata", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("publications"),
    ta_json_x_1.JsonElementType(opds2_publication_1.OPDSPublication),
    tslib_1.__metadata("design:type", Array)
], OPDSGroup.prototype, "Publications", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("links"),
    ta_json_x_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSGroup.prototype, "Links", void 0);
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("navigation"),
    ta_json_x_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSGroup.prototype, "Navigation", void 0);
tslib_1.__decorate([
    ta_json_x_1.OnDeserialized(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OPDSGroup.prototype, "_OnDeserialized", null);
OPDSGroup = tslib_1.__decorate([
    ta_json_x_1.JsonObject()
], OPDSGroup);
exports.OPDSGroup = OPDSGroup;
//# sourceMappingURL=opds2-group.js.map