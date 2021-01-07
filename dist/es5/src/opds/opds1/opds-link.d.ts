import { Availability } from "./opds-availability";
import { Copies } from "./opds-copies";
import { Holds } from "./opds-holds";
import { IndirectAcquisition } from "./opds-indirectAcquisition";
export declare class Link {
    OpdsPrice: number;
    OpdsPriceCurrencyCode: string;
    OpdsIndirectAcquisitions: IndirectAcquisition[];
    OpdsAvailability: Availability;
    OpdsCopies: Copies;
    OpdsHolds: Holds;
    LcpHashedPassphrase: string;
    Type: string;
    ThrCount: number;
    FacetGroup: string;
    Href: string;
    Title: string;
    Rel: string;
    HasRel(rel: string): boolean;
    SetRel(rel: string): void;
}
