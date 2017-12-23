"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_1 = require("ta-json");
const opds2_link_1 = require("./opds2-link");
let OPDSContributor = class OPDSContributor {
};
tslib_1.__decorate([
    ta_json_1.JsonProperty("name"),
    tslib_1.__metadata("design:type", Object)
], OPDSContributor.prototype, "Name", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("sort_as"),
    tslib_1.__metadata("design:type", String)
], OPDSContributor.prototype, "SortAs", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("identifier"),
    tslib_1.__metadata("design:type", String)
], OPDSContributor.prototype, "Identifier", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("role"),
    tslib_1.__metadata("design:type", String)
], OPDSContributor.prototype, "Role", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("links"),
    ta_json_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSContributor.prototype, "Links", void 0);
OPDSContributor = tslib_1.__decorate([
    ta_json_1.JsonObject()
], OPDSContributor);
exports.OPDSContributor = OPDSContributor;
//# sourceMappingURL=opds2-contributor.js.map