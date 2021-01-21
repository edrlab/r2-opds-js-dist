import { Metadata } from "r2-shared-js/dist/es7-es2016/src/models/metadata";
import { Link } from "r2-shared-js/dist/es7-es2016/src/models/publication-link";
import { OPDSLink } from "./opds2-link";
export declare class OPDSPublication {
    Metadata: Metadata;
    Links: OPDSLink[];
    Images: Link[];
    Image: Link;
    findFirstLinkByRel(rel: string): OPDSLink | undefined;
    AddImage(href: string, typeImage: string, height: number, width: number): void;
    AddLink_(href: string, typeLink: string, rel: string, title: string): void;
    AddAuthor(name: string, identifier: string, sortAs: string, href: string, typeLink: string): void;
    AddSerie(name: string, position: number, href: string, typeLink: string): void;
    AddPublisher(name: string, href: string, typeLink: string): void;
    protected _OnDeserialized(): void;
}
