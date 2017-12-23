import { OPDSLink } from "./opds2-link";
import { IStringMap } from "./opds2-multilang";
export declare class OPDSContributor {
    Name: string | IStringMap;
    SortAs: string;
    Identifier: string;
    Role: string;
    Links: OPDSLink[];
}
