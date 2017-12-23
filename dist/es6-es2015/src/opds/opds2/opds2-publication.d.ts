import { OPDSLink } from "./opds2-link";
import { OPDSPublicationMetadata } from "./opds2-publicationMetadata";
export declare class OPDSPublication {
    Metadata: OPDSPublicationMetadata;
    Links: OPDSLink[];
    Images: OPDSLink[];
    findFirstLinkByRel(rel: string): OPDSLink | undefined;
    AddImage(href: string, typeImage: string, height: number, width: number): void;
    AddLink(href: string, typeLink: string, rel: string, title: string): void;
    AddAuthor(name: string, identifier: string, sortAs: string, href: string, typeLink: string): void;
    AddSerie(name: string, position: number, href: string, typeLink: string): void;
    AddPublisher(name: string, href: string, typeLink: string): void;
    private _OnDeserialized();
}
