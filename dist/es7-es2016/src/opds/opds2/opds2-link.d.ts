import { OPDSProperties } from "./opds2-properties";
export declare class OPDSLink {
    Href: string;
    TypeLink: string;
    Height: number;
    Width: number;
    Title: string;
    Properties: OPDSProperties;
    Duration: number;
    Templated: boolean;
    Children: OPDSLink[];
    Bitrate: number;
    Rel: string[];
    AddRels(rels: string[]): void;
    AddRel(rel: string): void;
    HasRel(rel: string): boolean;
    private _OnDeserialized();
}
