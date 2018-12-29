import { OPDSLink } from "./opds2-link";
import { OPDSMetadata } from "./opds2-metadata";
import { OPDSPublication } from "./opds2-publication";
export declare class OPDSGroup {
    Metadata: OPDSMetadata;
    Publications: OPDSPublication[];
    Links: OPDSLink[];
    Navigation: OPDSLink[];
}
