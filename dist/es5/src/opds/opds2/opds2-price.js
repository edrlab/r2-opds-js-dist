"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ta_json_1 = require("ta-json");
var OPDSPrice = (function () {
    function OPDSPrice() {
    }
    OPDSPrice.prototype._OnDeserialized = function () {
        if (!this.Currency) {
            console.log("OPDSPrice.Currency is not set!");
        }
        if (!this.Value) {
            console.log("OPDSPrice.Value is not set!");
        }
    };
    tslib_1.__decorate([
        ta_json_1.JsonProperty("currency"),
        tslib_1.__metadata("design:type", String)
    ], OPDSPrice.prototype, "Currency", void 0);
    tslib_1.__decorate([
        ta_json_1.JsonProperty("value"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSPrice.prototype, "Value", void 0);
    tslib_1.__decorate([
        ta_json_1.OnDeserialized(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSPrice.prototype, "_OnDeserialized", null);
    OPDSPrice = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSPrice);
    return OPDSPrice;
}());
exports.OPDSPrice = OPDSPrice;
//# sourceMappingURL=opds2-price.js.map