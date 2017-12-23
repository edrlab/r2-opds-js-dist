import { OPDSContributor } from "./opds2-contributor";
export declare class OPDSMetadata {
    Author: OPDSContributor[];
    RDFType: string;
    Title: string;
    NumberOfItems: number;
    ItemsPerPage: number;
    CurrentPage: number;
    Modified: Date;
    private _OnDeserialized();
}
