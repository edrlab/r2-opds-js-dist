"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serie = void 0;
var tslib_1 = require("tslib");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var Serie = (function () {
    function Serie() {
    }
    tslib_1.__decorate([
        xml_js_mapper_1.XmlXPathSelector("@schema:name"),
        tslib_1.__metadata("design:type", String)
    ], Serie.prototype, "Name", void 0);
    tslib_1.__decorate([
        xml_js_mapper_1.XmlXPathSelector("@schema:url"),
        tslib_1.__metadata("design:type", String)
    ], Serie.prototype, "Url", void 0);
    tslib_1.__decorate([
        xml_js_mapper_1.XmlXPathSelector("@schema:position"),
        tslib_1.__metadata("design:type", Number)
    ], Serie.prototype, "Position", void 0);
    Serie = tslib_1.__decorate([
        xml_js_mapper_1.XmlObject({
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
    ], Serie);
    return Serie;
}());
exports.Serie = Serie;
//# sourceMappingURL=opds-serie.js.map