"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
var tslib_1 = require("tslib");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var opds_availability_1 = require("./opds-availability");
var opds_copies_1 = require("./opds-copies");
var opds_holds_1 = require("./opds-holds");
var opds_indirectAcquisition_1 = require("./opds-indirectAcquisition");
var Link = (function () {
    function Link() {
    }
    Link.prototype.HasRel = function (rel) {
        return this.Rel === rel;
    };
    Link.prototype.SetRel = function (rel) {
        this.Rel = rel;
    };
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("opds:price/text()"),
        tslib_1.__metadata("design:type", Number)
    ], Link.prototype, "OpdsPrice", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("opds:price/@currencycode"),
        tslib_1.__metadata("design:type", String)
    ], Link.prototype, "OpdsPriceCurrencyCode", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("opds:indirectAcquisition"),
        (0, xml_js_mapper_1.XmlItemType)(opds_indirectAcquisition_1.IndirectAcquisition),
        tslib_1.__metadata("design:type", Array)
    ], Link.prototype, "OpdsIndirectAcquisitions", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("opds:availability"),
        tslib_1.__metadata("design:type", opds_availability_1.Availability)
    ], Link.prototype, "OpdsAvailability", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("opds:copies"),
        tslib_1.__metadata("design:type", opds_copies_1.Copies)
    ], Link.prototype, "OpdsCopies", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("opds:holds"),
        tslib_1.__metadata("design:type", opds_holds_1.Holds)
    ], Link.prototype, "OpdsHolds", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("lcp:hashed_passphrase/text()"),
        tslib_1.__metadata("design:type", String)
    ], Link.prototype, "LcpHashedPassphrase", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@type"),
        tslib_1.__metadata("design:type", String)
    ], Link.prototype, "Type", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@thr:count"),
        tslib_1.__metadata("design:type", Number)
    ], Link.prototype, "ThrCount", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@opds:facetGroup"),
        tslib_1.__metadata("design:type", String)
    ], Link.prototype, "FacetGroup", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@href"),
        tslib_1.__metadata("design:type", String)
    ], Link.prototype, "Href", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@title"),
        tslib_1.__metadata("design:type", String)
    ], Link.prototype, "Title", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@rel"),
        tslib_1.__metadata("design:type", String)
    ], Link.prototype, "Rel", void 0);
    Link = tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlObject)({
            app: "http://www.w3.org/2007/app",
            atom: "http://www.w3.org/2005/Atom",
            bibframe: "http://bibframe.org/vocab/",
            dcterms: "http://purl.org/dc/terms/",
            lcp: "http://readium.org/lcp-specs/ns",
            odl: "http://opds-spec.org/odl",
            opds: "http://opds-spec.org/2010/catalog",
            opensearch: "http://a9.com/-/spec/opensearch/1.1/",
            relevance: "http://a9.com/-/opensearch/extensions/relevance/1.0/",
            schema: "http://schema.org",
            thr: "http://purl.org/syndication/thread/1.0",
            xsi: "http://www.w3.org/2001/XMLSchema-instance",
        })
    ], Link);
    return Link;
}());
exports.Link = Link;
//# sourceMappingURL=opds-link.js.map