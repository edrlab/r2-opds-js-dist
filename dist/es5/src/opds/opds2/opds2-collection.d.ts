import { OPDSLink } from "./opds2-link";
export declare class OPDSCollection {
    Name: string;
    SortAs: string;
    Identifier: string;
    Position: number;
    Links: OPDSLink[];
    private _OnDeserialized();
}
