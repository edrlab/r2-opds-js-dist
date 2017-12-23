"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ta_json_1 = require("ta-json");
const opds2_collection_1 = require("./opds2-collection");
class JsonOPDSCollectionConverter {
    serialize(property) {
        return ta_json_1.JSON.serialize(property);
    }
    deserialize(value) {
        if (typeof value === "string") {
            const c = new opds2_collection_1.OPDSCollection();
            c.Name = value;
            return c;
        }
        else {
            return ta_json_1.JSON.deserialize(value, opds2_collection_1.OPDSCollection);
        }
    }
    collapseArrayWithSingleItem() {
        return true;
    }
}
exports.JsonOPDSCollectionConverter = JsonOPDSCollectionConverter;
//# sourceMappingURL=opds2-collection-json-converter.js.map