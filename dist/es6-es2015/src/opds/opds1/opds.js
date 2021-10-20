"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDS = void 0;
const tslib_1 = require("tslib");
const xml_js_mapper_1 = require("r2-utils-js/dist/es6-es2015/src/_utils/xml-js-mapper");
const opds_author_1 = require("./opds-author");
const opds_entry_1 = require("./opds-entry");
const opds_link_1 = require("./opds-link");
let OPDS = class OPDS {
};
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("opensearch:totalResults/text()"),
    (0, tslib_1.__metadata)("design:type", Number)
], OPDS.prototype, "OpensearchTotalResults", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("opensearch:itemsPerPage/text()"),
    (0, tslib_1.__metadata)("design:type", Number)
], OPDS.prototype, "OpensearchItemsPerPage", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:id/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDS.prototype, "Id", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:title/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDS.prototype, "Title", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:subtitle/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDS.prototype, "SubTitle", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:updated/text()"),
    (0, tslib_1.__metadata)("design:type", Date)
], OPDS.prototype, "Updated", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:icon/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDS.prototype, "Icon", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:author"),
    (0, xml_js_mapper_1.XmlItemType)(opds_author_1.Author),
    (0, tslib_1.__metadata)("design:type", Array)
], OPDS.prototype, "Authors", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("@lang | @xml:lang"),
    (0, tslib_1.__metadata)("design:type", String)
], OPDS.prototype, "Lang", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:link"),
    (0, xml_js_mapper_1.XmlItemType)(opds_link_1.Link),
    (0, tslib_1.__metadata)("design:type", Array)
], OPDS.prototype, "Links", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:entry"),
    (0, xml_js_mapper_1.XmlItemType)(opds_entry_1.Entry),
    (0, tslib_1.__metadata)("design:type", Array)
], OPDS.prototype, "Entries", void 0);
OPDS = (0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlObject)({
        app: "http://www.w3.org/2007/app",
        atom: "http://www.w3.org/2005/Atom",
        bibframe: "http://bibframe.org/vocab/",
        dcterms: "http://purl.org/dc/terms/",
        odl: "http://opds-spec.org/odl",
        opds: "http://opds-spec.org/2010/catalog",
        opensearch: "http://a9.com/-/spec/opensearch/1.1/",
        relevance: "http://a9.com/-/opensearch/extensions/relevance/1.0/",
        schema: "http://schema.org",
        thr: "http://purl.org/syndication/thread/1.0",
        xml: "http://www.w3.org/XML/1998/namespace",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
    })
], OPDS);
exports.OPDS = OPDS;
//# sourceMappingURL=opds.js.map