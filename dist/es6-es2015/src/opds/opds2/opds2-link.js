"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSLink = exports.OPDSLinkRelEnum = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const publication_link_1 = require("r2-shared-js/dist/es6-es2015/src/models/publication-link");
const opds2_properties_1 = require("./opds2-properties");
var OPDSLinkRelEnum;
(function (OPDSLinkRelEnum) {
    OPDSLinkRelEnum["Preview"] = "preview";
    OPDSLinkRelEnum["PreviewURI"] = "http://opds-spec.org/acquisition/preview";
    OPDSLinkRelEnum["AcquisitionURI"] = "http://opds-spec.org/acquisition";
    OPDSLinkRelEnum["BuyURI"] = "http://opds-spec.org/acquisition/buy";
    OPDSLinkRelEnum["OpenAccessURI"] = "http://opds-spec.org/acquisition/open-access";
    OPDSLinkRelEnum["BorrowURI"] = "http://opds-spec.org/acquisition/borrow";
    OPDSLinkRelEnum["SampleURI"] = "http://opds-spec.org/acquisition/sample";
    OPDSLinkRelEnum["SubscribeURI"] = "http://opds-spec.org/acquisition/subscribe";
})(OPDSLinkRelEnum = exports.OPDSLinkRelEnum || (exports.OPDSLinkRelEnum = {}));
const PROPERTIES_JSON_PROP = "properties";
let OPDSLink = (() => {
    let OPDSLink = class OPDSLink extends publication_link_1.Link {
    };
    tslib_1.__decorate([
        ta_json_x_1.JsonProperty(PROPERTIES_JSON_PROP),
        tslib_1.__metadata("design:type", opds2_properties_1.OPDSProperties)
    ], OPDSLink.prototype, "Properties", void 0);
    OPDSLink = tslib_1.__decorate([
        ta_json_x_1.JsonObject()
    ], OPDSLink);
    return OPDSLink;
})();
exports.OPDSLink = OPDSLink;
//# sourceMappingURL=opds2-link.js.map