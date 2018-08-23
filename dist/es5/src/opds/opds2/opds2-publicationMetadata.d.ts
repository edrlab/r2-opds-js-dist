import { Metadata } from "r2-shared-js/dist/es5/src/models/metadata";
import { OPDSContributor } from "./opds2-contributor";
export declare class OPDSPublicationMetadata extends Metadata {
    Author: OPDSContributor[];
    Translator: OPDSContributor[];
    Editor: OPDSContributor[];
    Artist: OPDSContributor[];
    Illustrator: OPDSContributor[];
    Letterer: OPDSContributor[];
    Penciler: OPDSContributor[];
    Colorist: OPDSContributor[];
    Inker: OPDSContributor[];
    Narrator: OPDSContributor[];
    OPDSContributor: OPDSContributor[];
    Publisher: OPDSContributor[];
    Imprint: OPDSContributor[];
}
