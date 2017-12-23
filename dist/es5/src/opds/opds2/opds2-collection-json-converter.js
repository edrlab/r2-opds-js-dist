"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ta_json_1 = require("ta-json");
var opds2_collection_1 = require("./opds2-collection");
var JsonOPDSCollectionConverter = (function () {
    function JsonOPDSCollectionConverter() {
    }
    JsonOPDSCollectionConverter.prototype.serialize = function (property) {
        return ta_json_1.JSON.serialize(property);
    };
    JsonOPDSCollectionConverter.prototype.deserialize = function (value) {
        if (typeof value === "string") {
            var c = new opds2_collection_1.OPDSCollection();
            c.Name = value;
            return c;
        }
        else {
            return ta_json_1.JSON.deserialize(value, opds2_collection_1.OPDSCollection);
        }
    };
    JsonOPDSCollectionConverter.prototype.collapseArrayWithSingleItem = function () {
        return true;
    };
    return JsonOPDSCollectionConverter;
}());
exports.JsonOPDSCollectionConverter = JsonOPDSCollectionConverter;
//# sourceMappingURL=opds2-collection-json-converter.js.map