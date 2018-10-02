"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const metadata_contributor_1 = require("r2-shared-js/dist/es8-es2017/src/models/metadata-contributor");
const ta_json_x_1 = require("ta-json-x");
const opds2_link_1 = require("./opds2-link");
let OPDSContributor = class OPDSContributor extends metadata_contributor_1.Contributor {
};
tslib_1.__decorate([
    ta_json_x_1.JsonProperty("links"),
    ta_json_x_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSContributor.prototype, "Links", void 0);
OPDSContributor = tslib_1.__decorate([
    ta_json_x_1.JsonObject()
], OPDSContributor);
exports.OPDSContributor = OPDSContributor;
//# sourceMappingURL=opds2-contributor.js.map