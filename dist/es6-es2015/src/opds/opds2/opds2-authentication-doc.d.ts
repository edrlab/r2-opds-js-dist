import { IWithAdditionalJSON, JsonMap } from "r2-lcp-js/dist/es6-es2015/src/serializable";
import { OPDSAuthentication } from "./opds2-authentication";
import { OPDSLink } from "./opds2-link";
export declare class OPDSAuthenticationDoc implements IWithAdditionalJSON {
    Title: string;
    Id: string;
    Description: string;
    Links: OPDSLink[];
    Authentication: OPDSAuthentication[];
    AdditionalJSON: JsonMap;
    protected _OnDeserialized(): void;
}
