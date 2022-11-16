"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var tslib_1 = require("tslib");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var Category = (function () {
    function Category() {
    }
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@term"),
        tslib_1.__metadata("design:type", String)
    ], Category.prototype, "Term", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@scheme"),
        tslib_1.__metadata("design:type", String)
    ], Category.prototype, "Scheme", void 0);
    tslib_1.__decorate([
        (0, xml_js_mapper_1.XmlXPathSelector)("@label"),
        tslib_1.__metadata("design:type", String)
    ], Category.prototype, "Label", void 0);
    Category = tslib_1.__decorate([
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
    ], Category);
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=opds-category.js.map