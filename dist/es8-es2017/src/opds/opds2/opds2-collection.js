"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const metadata_collection_1 = require("r2-shared-js/dist/es8-es2017/src/models/metadata-collection");
const ta_json_1 = require("ta-json");
const opds2_link_1 = require("./opds2-link");
let OPDSCollection = class OPDSCollection extends metadata_collection_1.Collection {
};
tslib_1.__decorate([
    ta_json_1.JsonProperty("links"),
    ta_json_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSCollection.prototype, "Links", void 0);
OPDSCollection = tslib_1.__decorate([
    ta_json_1.JsonObject()
], OPDSCollection);
exports.OPDSCollection = OPDSCollection;
//# sourceMappingURL=opds2-collection.js.map