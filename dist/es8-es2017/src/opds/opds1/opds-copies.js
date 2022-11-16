"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Copies = void 0;
const tslib_1 = require("tslib");
const xml_js_mapper_1 = require("r2-utils-js/dist/es8-es2017/src/_utils/xml-js-mapper");
let Copies = class Copies {
};
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("@total"),
    tslib_1.__metadata("design:type", Number)
], Copies.prototype, "Total", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("@available"),
    tslib_1.__metadata("design:type", Number)
], Copies.prototype, "Available", void 0);
Copies = tslib_1.__decorate([
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
], Copies);
exports.Copies = Copies;
//# sourceMappingURL=opds-copies.js.map