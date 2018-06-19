"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var OPDSLink_1;
"use strict";
const ta_json_string_converter_1 = require("r2-utils-js/dist/es7-es2016/src/_utils/ta-json-string-converter");
const ta_json_1 = require("ta-json");
const opds2_properties_1 = require("./opds2-properties");
let OPDSLink = OPDSLink_1 = class OPDSLink {
    AddRels(rels) {
        rels.forEach((rel) => {
            this.AddRel(rel);
        });
    }
    AddRel(rel) {
        if (this.HasRel(rel)) {
            return;
        }
        if (!this.Rel) {
            this.Rel = [rel];
        }
        else {
            this.Rel.push(rel);
        }
    }
    HasRel(rel) {
        return this.Rel && this.Rel.indexOf(rel) >= 0;
    }
    _OnDeserialized() {
        if (!this.Href) {
            console.log("Link.Href is not set!");
        }
    }
};
tslib_1.__decorate([
    ta_json_1.JsonProperty("href"),
    tslib_1.__metadata("design:type", String)
], OPDSLink.prototype, "Href", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("type"),
    tslib_1.__metadata("design:type", String)
], OPDSLink.prototype, "TypeLink", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("height"),
    tslib_1.__metadata("design:type", Number)
], OPDSLink.prototype, "Height", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("width"),
    tslib_1.__metadata("design:type", Number)
], OPDSLink.prototype, "Width", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("title"),
    tslib_1.__metadata("design:type", String)
], OPDSLink.prototype, "Title", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("properties"),
    tslib_1.__metadata("design:type", opds2_properties_1.OPDSProperties)
], OPDSLink.prototype, "Properties", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("duration"),
    tslib_1.__metadata("design:type", Number)
], OPDSLink.prototype, "Duration", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("templated"),
    tslib_1.__metadata("design:type", Boolean)
], OPDSLink.prototype, "Templated", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("children"),
    ta_json_1.JsonElementType(OPDSLink_1),
    tslib_1.__metadata("design:type", Array)
], OPDSLink.prototype, "Children", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("bitrate"),
    tslib_1.__metadata("design:type", Number)
], OPDSLink.prototype, "Bitrate", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("rel"),
    ta_json_1.JsonConverter(ta_json_string_converter_1.JsonStringConverter),
    ta_json_1.JsonElementType(String),
    tslib_1.__metadata("design:type", Array)
], OPDSLink.prototype, "Rel", void 0);
tslib_1.__decorate([
    ta_json_1.OnDeserialized(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OPDSLink.prototype, "_OnDeserialized", null);
OPDSLink = OPDSLink_1 = tslib_1.__decorate([
    ta_json_1.JsonObject()
], OPDSLink);
exports.OPDSLink = OPDSLink;
//# sourceMappingURL=opds2-link.js.map