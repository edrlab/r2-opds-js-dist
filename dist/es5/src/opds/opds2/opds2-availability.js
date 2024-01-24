"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSAvailability = exports.OPDSAvailabilityEnum = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var OPDSAvailabilityEnum;
(function (OPDSAvailabilityEnum) {
    OPDSAvailabilityEnum["Available"] = "available";
    OPDSAvailabilityEnum["Unavailable"] = "unavailable";
    OPDSAvailabilityEnum["Reserved"] = "reserved";
    OPDSAvailabilityEnum["Ready"] = "ready";
})(OPDSAvailabilityEnum || (exports.OPDSAvailabilityEnum = OPDSAvailabilityEnum = {}));
var OPDSAvailability = (function () {
    function OPDSAvailability() {
    }
    OPDSAvailability.prototype._OnDeserialized = function () {
        if (!this.State) {
            console.log("OPDSAvailability.State is not set!");
        }
    };
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("state"),
        tslib_1.__metadata("design:type", String)
    ], OPDSAvailability.prototype, "State", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("since"),
        tslib_1.__metadata("design:type", Date)
    ], OPDSAvailability.prototype, "Since", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("until"),
        tslib_1.__metadata("design:type", Date)
    ], OPDSAvailability.prototype, "Until", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.OnDeserialized)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSAvailability.prototype, "_OnDeserialized", null);
    return OPDSAvailability;
}());
exports.OPDSAvailability = OPDSAvailability;
//# sourceMappingURL=opds2-availability.js.map