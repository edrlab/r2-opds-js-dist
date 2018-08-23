import { Properties } from "r2-shared-js/dist/es6-es2015/src/models/metadata-properties";
import { OPDSIndirectAcquisition } from "./opds2-indirectAcquisition";
import { OPDSPrice } from "./opds2-price";
export declare class OPDSProperties extends Properties {
    NumberOfItems: number;
    Price: OPDSPrice;
    IndirectAcquisitions: OPDSIndirectAcquisition[];
}
