"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const tslib_1 = require("tslib");
const xml_js_mapper_1 = require("r2-utils-js/dist/es6-es2015/src/_utils/xml-js-mapper");
const opds_author_1 = require("./opds-author");
const opds_category_1 = require("./opds-category");
const opds_link_1 = require("./opds-link");
const opds_serie_1 = require("./opds-serie");
let Entry = class Entry {
};
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("schema:Rating/@schema:ratingValue"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "SchemaRatingValue", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("schema:Rating/@schema:additionalType"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "SchemaRatingAdditionalType", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("@schema:additionalType"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "SchemaAdditionalType", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:title/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "Title", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:title/@type"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "TitleType", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:subtitle/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "SubTitle", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:subtitle/@type"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "SubTitleType", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:author"),
    (0, xml_js_mapper_1.XmlItemType)(opds_author_1.Author),
    (0, tslib_1.__metadata)("design:type", Array)
], Entry.prototype, "Authors", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:id/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "Id", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:summary/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "Summary", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:summary/@type"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "SummaryType", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:language/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "DcLanguage", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:extent/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "DcExtent", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:publisher/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "DcPublisher", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:rights/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "DcRights", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:issued/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "DcIssued", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:identifier/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "DcIdentifier", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:identifier/@xsi:type"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "DcIdentifierType", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("bibframe:distribution/@bibframe:ProviderName"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "BibFrameDistributionProviderName", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:category"),
    (0, xml_js_mapper_1.XmlItemType)(opds_category_1.Category),
    (0, tslib_1.__metadata)("design:type", Array)
], Entry.prototype, "Categories", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:content/text()"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "Content", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:content/@type"),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "ContentType", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:updated/text()"),
    (0, tslib_1.__metadata)("design:type", Date)
], Entry.prototype, "Updated", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:published/text()"),
    (0, tslib_1.__metadata)("design:type", Date)
], Entry.prototype, "Published", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:link"),
    (0, xml_js_mapper_1.XmlItemType)(opds_link_1.Link),
    (0, tslib_1.__metadata)("design:type", Array)
], Entry.prototype, "Links", void 0);
(0, tslib_1.__decorate)([
    (0, xml_js_mapper_1.XmlXPathSelector)("schema:Series"),
    (0, xml_js_mapper_1.XmlItemType)(opds_serie_1.Serie),
    (0, tslib_1.__metadata)("design:type", Array)
], Entry.prototype, "Series", void 0);
Entry = (0, tslib_1.__decorate)([
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
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
    })
], Entry);
exports.Entry = Entry;
//# sourceMappingURL=opds-entry.js.map