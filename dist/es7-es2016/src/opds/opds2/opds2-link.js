"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const publication_link_1 = require("r2-shared-js/dist/es7-es2016/src/models/publication-link");
const ta_json_1 = require("ta-json");
const opds2_properties_1 = require("./opds2-properties");
let OPDSLink = class OPDSLink extends publication_link_1.Link {
};
tslib_1.__decorate([
    ta_json_1.JsonProperty("properties"),
    tslib_1.__metadata("design:type", opds2_properties_1.OPDSProperties)
], OPDSLink.prototype, "Properties", void 0);
OPDSLink = tslib_1.__decorate([
    ta_json_1.JsonObject()
], OPDSLink);
exports.OPDSLink = OPDSLink;
//# sourceMappingURL=opds2-link.js.map