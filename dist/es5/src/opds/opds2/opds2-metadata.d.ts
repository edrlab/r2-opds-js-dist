import { Metadata } from "r2-shared-js/dist/es5/src/models/metadata";
import { OPDSContributor } from "./opds2-contributor";
export declare class OPDSMetadata extends Metadata {
    Author: OPDSContributor[];
    NumberOfItems: number;
    ItemsPerPage: number;
    CurrentPage: number;
}
