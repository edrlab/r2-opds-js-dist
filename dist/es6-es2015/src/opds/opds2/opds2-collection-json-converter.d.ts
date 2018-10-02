import { IPropertyConverter, JsonValue } from "ta-json-x";
import { OPDSCollection } from "./opds2-collection";
export declare class JsonOPDSCollectionConverter implements IPropertyConverter {
    serialize(property: OPDSCollection): JsonValue;
    deserialize(value: JsonValue): OPDSCollection;
    collapseArrayWithSingleItem(): boolean;
}
