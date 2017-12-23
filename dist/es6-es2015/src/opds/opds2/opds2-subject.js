"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_1 = require("ta-json");
let OPDSSubject = class OPDSSubject {
    _OnDeserialized() {
        if (!this.Name) {
            console.log("OPDSSubject.Name is not set!");
        }
    }
};
tslib_1.__decorate([
    ta_json_1.JsonProperty("name"),
    tslib_1.__metadata("design:type", String)
], OPDSSubject.prototype, "Name", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("sort_as"),
    tslib_1.__metadata("design:type", String)
], OPDSSubject.prototype, "SortAs", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("scheme"),
    tslib_1.__metadata("design:type", String)
], OPDSSubject.prototype, "Scheme", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("code"),
    tslib_1.__metadata("design:type", String)
], OPDSSubject.prototype, "Code", void 0);
tslib_1.__decorate([
    ta_json_1.OnDeserialized(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OPDSSubject.prototype, "_OnDeserialized", null);
OPDSSubject = tslib_1.__decorate([
    ta_json_1.JsonObject()
], OPDSSubject);
exports.OPDSSubject = OPDSSubject;
//# sourceMappingURL=opds2-subject.js.map