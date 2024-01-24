"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Availability = void 0;
const tslib_1 = require("tslib");
const xml_js_mapper_1 = require("r2-utils-js/dist/es8-es2017/src/_utils/xml-js-mapper");
let Availability = class Availability {
};
exports.Availability = Availability;
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("@state"),
    tslib_1.__metadata("design:type", String)
], Availability.prototype, "State", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("@status"),
    tslib_1.__metadata("design:type", String)
], Availability.prototype, "Status", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("@since"),
    tslib_1.__metadata("design:type", Date)
], Availability.prototype, "Since", void 0);
tslib_1.__decorate([
    (0, xml_js_mapper_1.XmlXPathSelector)("@until"),
    tslib_1.__metadata("design:type", Date)
], Availability.prototype, "Until", void 0);
exports.Availability = Availability = tslib_1.__decorate([
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
], Availability);
//# sourceMappingURL=opds-availability.js.map