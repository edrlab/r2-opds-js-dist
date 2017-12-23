import { IndirectAcquisition } from "./opds-indirectAcquisition";
export declare class Link {
    OpdsPrice: number;
    OpdsPriceCurrencyCode: string;
    OpdsIndirectAcquisitions: IndirectAcquisition[];
    Type: string;
    ThrCount: number;
    FacetGroup: string;
    Href: string;
    Title: string;
    Rel: string;
    HasRel(rel: string): boolean;
    SetRel(rel: string): void;
}
