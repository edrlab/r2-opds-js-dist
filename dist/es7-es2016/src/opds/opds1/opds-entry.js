"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const tslib_1 = require("tslib");
const xml_js_mapper_1 = require("r2-utils-js/dist/es7-es2016/src/_utils/xml-js-mapper");
const opds_author_1 = require("./opds-author");
const opds_category_1 = require("./opds-category");
const opds_link_1 = require("./opds-link");
const opds_serie_1 = require("./opds-serie");
let Entry = class Entry {
};
exports.Entry = Entry;
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("schema:Rating/@schema:ratingValue"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "SchemaRatingValue", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("schema:Rating/@schema:additionalType"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "SchemaRatingAdditionalType", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("@schema:additionalType"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "SchemaAdditionalType", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:title/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "Title", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:title/@type"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "TitleType", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:subtitle/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "SubTitle", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:subtitle/@type"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "SubTitleType", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:author"),
    (0, xml_js_mapper_1.XmlItemType)(opds_author_1.Author),
    tslib_1.__metadata("design:type", Array)
], Entry.prototype, "Authors", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:id/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "Id", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:summary/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "Summary", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:summary/@type"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "SummaryType", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:language/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "DcLanguage", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:extent/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "DcExtent", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:publisher/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "DcPublisher", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:rights/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "DcRights", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:issued/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "DcIssued", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:identifier/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "DcIdentifier", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("dcterms:identifier/@xsi:type"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "DcIdentifierType", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("bibframe:distribution/@bibframe:ProviderName"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "BibFrameDistributionProviderName", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:category"),
    (0, xml_js_mapper_1.XmlItemType)(opds_category_1.Category),
    tslib_1.__metadata("design:type", Array)
], Entry.prototype, "Categories", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:content/text()"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "Content", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:content/@type"),
    tslib_1.__metadata("design:type", String)
], Entry.prototype, "ContentType", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:updated/text()"),
    tslib_1.__metadata("design:type", Date)
], Entry.prototype, "Updated", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:published/text()"),
    tslib_1.__metadata("design:type", Date)
], Entry.prototype, "Published", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("atom:link"),
    (0, xml_js_mapper_1.XmlItemType)(opds_link_1.Link),
    tslib_1.__metadata("design:type", Array)
], Entry.prototype, "Links", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("schema:Series"),
    (0, xml_js_mapper_1.XmlItemType)(opds_serie_1.Serie),
    tslib_1.__metadata("design:type", Array)
], Entry.prototype, "Series", void 0);
exports.Entry = Entry = tslib_1.__decorate([
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
//# sourceMappingURL=opds-entry.js.map