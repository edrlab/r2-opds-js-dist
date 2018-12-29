import { Properties } from "r2-shared-js/dist/es8-es2017/src/models/metadata-properties";
import { OPDSAvailability } from "./opds2-availability";
import { OPDSCopy } from "./opds2-copy";
import { OPDSHold } from "./opds2-hold";
import { OPDSIndirectAcquisition } from "./opds2-indirectAcquisition";
import { OPDSPrice } from "./opds2-price";
export declare class OPDSProperties extends Properties {
    NumberOfItems: number;
    Price: OPDSPrice;
    IndirectAcquisitions: OPDSIndirectAcquisition[];
    Holds: OPDSHold;
    Copies: OPDSCopy;
    Availability: OPDSAvailability;
}
