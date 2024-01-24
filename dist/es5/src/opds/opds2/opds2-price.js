"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSPrice = exports.OPDSCurrencyEnum = void 0;
var tslib_1 = require("tslib");
var ta_json_x_1 = require("ta-json-x");
var OPDSCurrencyEnum;
(function (OPDSCurrencyEnum) {
    OPDSCurrencyEnum["AED"] = "AED";
    OPDSCurrencyEnum["AFN"] = "AFN";
    OPDSCurrencyEnum["ALL"] = "ALL";
    OPDSCurrencyEnum["AMD"] = "AMD";
    OPDSCurrencyEnum["ANG"] = "ANG";
    OPDSCurrencyEnum["AOA"] = "AOA";
    OPDSCurrencyEnum["ARS"] = "ARS";
    OPDSCurrencyEnum["AUD"] = "AUD";
    OPDSCurrencyEnum["AWG"] = "AWG";
    OPDSCurrencyEnum["AZN"] = "AZN";
    OPDSCurrencyEnum["BAM"] = "BAM";
    OPDSCurrencyEnum["BBD"] = "BBD";
    OPDSCurrencyEnum["BDT"] = "BDT";
    OPDSCurrencyEnum["BGN"] = "BGN";
    OPDSCurrencyEnum["BHD"] = "BHD";
    OPDSCurrencyEnum["BIF"] = "BIF";
    OPDSCurrencyEnum["BMD"] = "BMD";
    OPDSCurrencyEnum["BND"] = "BND";
    OPDSCurrencyEnum["BOB"] = "BOB";
    OPDSCurrencyEnum["BOV"] = "BOV";
    OPDSCurrencyEnum["BRL"] = "BRL";
    OPDSCurrencyEnum["BSD"] = "BSD";
    OPDSCurrencyEnum["BTN"] = "BTN";
    OPDSCurrencyEnum["BWP"] = "BWP";
    OPDSCurrencyEnum["BYN"] = "BYN";
    OPDSCurrencyEnum["BZD"] = "BZD";
    OPDSCurrencyEnum["CAD"] = "CAD";
    OPDSCurrencyEnum["CDF"] = "CDF";
    OPDSCurrencyEnum["CHE"] = "CHE";
    OPDSCurrencyEnum["CHF"] = "CHF";
    OPDSCurrencyEnum["CHW"] = "CHW";
    OPDSCurrencyEnum["CLF"] = "CLF";
    OPDSCurrencyEnum["CLP"] = "CLP";
    OPDSCurrencyEnum["CNY"] = "CNY";
    OPDSCurrencyEnum["COP"] = "COP";
    OPDSCurrencyEnum["COU"] = "COU";
    OPDSCurrencyEnum["CRC"] = "CRC";
    OPDSCurrencyEnum["CUC"] = "CUC";
    OPDSCurrencyEnum["CUP"] = "CUP";
    OPDSCurrencyEnum["CVE"] = "CVE";
    OPDSCurrencyEnum["CZK"] = "CZK";
    OPDSCurrencyEnum["DJF"] = "DJF";
    OPDSCurrencyEnum["DKK"] = "DKK";
    OPDSCurrencyEnum["DOP"] = "DOP";
    OPDSCurrencyEnum["DZD"] = "DZD";
    OPDSCurrencyEnum["EGP"] = "EGP";
    OPDSCurrencyEnum["ERN"] = "ERN";
    OPDSCurrencyEnum["ETB"] = "ETB";
    OPDSCurrencyEnum["EUR"] = "EUR";
    OPDSCurrencyEnum["FJD"] = "FJD";
    OPDSCurrencyEnum["FKP"] = "FKP";
    OPDSCurrencyEnum["GBP"] = "GBP";
    OPDSCurrencyEnum["GEL"] = "GEL";
    OPDSCurrencyEnum["GHS"] = "GHS";
    OPDSCurrencyEnum["GIP"] = "GIP";
    OPDSCurrencyEnum["GMD"] = "GMD";
    OPDSCurrencyEnum["GNF"] = "GNF";
    OPDSCurrencyEnum["GTQ"] = "GTQ";
    OPDSCurrencyEnum["GYD"] = "GYD";
    OPDSCurrencyEnum["HKD"] = "HKD";
    OPDSCurrencyEnum["HNL"] = "HNL";
    OPDSCurrencyEnum["HRK"] = "HRK";
    OPDSCurrencyEnum["HTG"] = "HTG";
    OPDSCurrencyEnum["HUF"] = "HUF";
    OPDSCurrencyEnum["IDR"] = "IDR";
    OPDSCurrencyEnum["ILS"] = "ILS";
    OPDSCurrencyEnum["INR"] = "INR";
    OPDSCurrencyEnum["IQD"] = "IQD";
    OPDSCurrencyEnum["IRR"] = "IRR";
    OPDSCurrencyEnum["ISK"] = "ISK";
    OPDSCurrencyEnum["JMD"] = "JMD";
    OPDSCurrencyEnum["JOD"] = "JOD";
    OPDSCurrencyEnum["JPY"] = "JPY";
    OPDSCurrencyEnum["KES"] = "KES";
    OPDSCurrencyEnum["KGS"] = "KGS";
    OPDSCurrencyEnum["KHR"] = "KHR";
    OPDSCurrencyEnum["KMF"] = "KMF";
    OPDSCurrencyEnum["KPW"] = "KPW";
    OPDSCurrencyEnum["KRW"] = "KRW";
    OPDSCurrencyEnum["KWD"] = "KWD";
    OPDSCurrencyEnum["KYD"] = "KYD";
    OPDSCurrencyEnum["KZT"] = "KZT";
    OPDSCurrencyEnum["LAK"] = "LAK";
    OPDSCurrencyEnum["LBP"] = "LBP";
    OPDSCurrencyEnum["LKR"] = "LKR";
    OPDSCurrencyEnum["LRD"] = "LRD";
    OPDSCurrencyEnum["LSL"] = "LSL";
    OPDSCurrencyEnum["LYD"] = "LYD";
    OPDSCurrencyEnum["MAD"] = "MAD";
    OPDSCurrencyEnum["MDL"] = "MDL";
    OPDSCurrencyEnum["MGA"] = "MGA";
    OPDSCurrencyEnum["MKD"] = "MKD";
    OPDSCurrencyEnum["MMK"] = "MMK";
    OPDSCurrencyEnum["MNT"] = "MNT";
    OPDSCurrencyEnum["MOP"] = "MOP";
    OPDSCurrencyEnum["MRU"] = "MRU";
    OPDSCurrencyEnum["MUR"] = "MUR";
    OPDSCurrencyEnum["MVR"] = "MVR";
    OPDSCurrencyEnum["MWK"] = "MWK";
    OPDSCurrencyEnum["MXN"] = "MXN";
    OPDSCurrencyEnum["MXV"] = "MXV";
    OPDSCurrencyEnum["MYR"] = "MYR";
    OPDSCurrencyEnum["MZN"] = "MZN";
    OPDSCurrencyEnum["NAD"] = "NAD";
    OPDSCurrencyEnum["NGN"] = "NGN";
    OPDSCurrencyEnum["NIO"] = "NIO";
    OPDSCurrencyEnum["NOK"] = "NOK";
    OPDSCurrencyEnum["NPR"] = "NPR";
    OPDSCurrencyEnum["NZD"] = "NZD";
    OPDSCurrencyEnum["OMR"] = "OMR";
    OPDSCurrencyEnum["PAB"] = "PAB";
    OPDSCurrencyEnum["PEN"] = "PEN";
    OPDSCurrencyEnum["PGK"] = "PGK";
    OPDSCurrencyEnum["PHP"] = "PHP";
    OPDSCurrencyEnum["PKR"] = "PKR";
    OPDSCurrencyEnum["PLN"] = "PLN";
    OPDSCurrencyEnum["PYG"] = "PYG";
    OPDSCurrencyEnum["QAR"] = "QAR";
    OPDSCurrencyEnum["RON"] = "RON";
    OPDSCurrencyEnum["RSD"] = "RSD";
    OPDSCurrencyEnum["RUB"] = "RUB";
    OPDSCurrencyEnum["RWF"] = "RWF";
    OPDSCurrencyEnum["SAR"] = "SAR";
    OPDSCurrencyEnum["SBD"] = "SBD";
    OPDSCurrencyEnum["SCR"] = "SCR";
    OPDSCurrencyEnum["SDG"] = "SDG";
    OPDSCurrencyEnum["SEK"] = "SEK";
    OPDSCurrencyEnum["SGD"] = "SGD";
    OPDSCurrencyEnum["SHP"] = "SHP";
    OPDSCurrencyEnum["SLL"] = "SLL";
    OPDSCurrencyEnum["SOS"] = "SOS";
    OPDSCurrencyEnum["SRD"] = "SRD";
    OPDSCurrencyEnum["SSP"] = "SSP";
    OPDSCurrencyEnum["STN"] = "STN";
    OPDSCurrencyEnum["SVC"] = "SVC";
    OPDSCurrencyEnum["SYP"] = "SYP";
    OPDSCurrencyEnum["SZL"] = "SZL";
    OPDSCurrencyEnum["THB"] = "THB";
    OPDSCurrencyEnum["TJS"] = "TJS";
    OPDSCurrencyEnum["TMT"] = "TMT";
    OPDSCurrencyEnum["TND"] = "TND";
    OPDSCurrencyEnum["TOP"] = "TOP";
    OPDSCurrencyEnum["TRY"] = "TRY";
    OPDSCurrencyEnum["TTD"] = "TTD";
    OPDSCurrencyEnum["TWD"] = "TWD";
    OPDSCurrencyEnum["TZS"] = "TZS";
    OPDSCurrencyEnum["UAH"] = "UAH";
    OPDSCurrencyEnum["UGX"] = "UGX";
    OPDSCurrencyEnum["USD"] = "USD";
    OPDSCurrencyEnum["USN"] = "USN";
    OPDSCurrencyEnum["UYI"] = "UYI";
    OPDSCurrencyEnum["UYU"] = "UYU";
    OPDSCurrencyEnum["UZS"] = "UZS";
    OPDSCurrencyEnum["VEF"] = "VEF";
    OPDSCurrencyEnum["VES"] = "VES";
    OPDSCurrencyEnum["VND"] = "VND";
    OPDSCurrencyEnum["VUV"] = "VUV";
    OPDSCurrencyEnum["WST"] = "WST";
    OPDSCurrencyEnum["XAF"] = "XAF";
    OPDSCurrencyEnum["XAG"] = "XAG";
    OPDSCurrencyEnum["XAU"] = "XAU";
    OPDSCurrencyEnum["XBA"] = "XBA";
    OPDSCurrencyEnum["XBB"] = "XBB";
    OPDSCurrencyEnum["XBC"] = "XBC";
    OPDSCurrencyEnum["XBD"] = "XBD";
    OPDSCurrencyEnum["XCD"] = "XCD";
    OPDSCurrencyEnum["XDR"] = "XDR";
    OPDSCurrencyEnum["XOF"] = "XOF";
    OPDSCurrencyEnum["XPD"] = "XPD";
    OPDSCurrencyEnum["XPF"] = "XPF";
    OPDSCurrencyEnum["XPT"] = "XPT";
    OPDSCurrencyEnum["XSU"] = "XSU";
    OPDSCurrencyEnum["XTS"] = "XTS";
    OPDSCurrencyEnum["XUA"] = "XUA";
    OPDSCurrencyEnum["XXX"] = "XXX";
    OPDSCurrencyEnum["YER"] = "YER";
    OPDSCurrencyEnum["ZAR"] = "ZAR";
    OPDSCurrencyEnum["ZMW"] = "ZMW";
    OPDSCurrencyEnum["ZWL"] = "ZWL";
})(OPDSCurrencyEnum || (exports.OPDSCurrencyEnum = OPDSCurrencyEnum = {}));
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
        (0, ta_json_x_1.JsonProperty)("currency"),
        tslib_1.__metadata("design:type", String)
    ], OPDSPrice.prototype, "Currency", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.JsonProperty)("value"),
        tslib_1.__metadata("design:type", Number)
    ], OPDSPrice.prototype, "Value", void 0);
    tslib_1.__decorate([
        (0, ta_json_x_1.OnDeserialized)(),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], OPDSPrice.prototype, "_OnDeserialized", null);
    OPDSPrice = tslib_1.__decorate([
        (0, ta_json_x_1.JsonObject)()
    ], OPDSPrice);
    return OPDSPrice;
}());
exports.OPDSPrice = OPDSPrice;
//# sourceMappingURL=opds2-price.js.map