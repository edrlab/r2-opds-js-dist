import { OPDS } from "./opds1/opds";
import { Entry } from "./opds1/opds-entry";
import { OPDSFeed } from "./opds2/opds2";
import { OPDSLink } from "./opds2/opds2-link";
import { OPDSPublication } from "./opds2/opds2-publication";
export declare function convertOpds1ToOpds2_EntryToPublication(entry: Entry): OPDSPublication;
export declare function convertOpds1ToOpds2_EntryToLink(entry: Entry): OPDSLink;
export declare function convertOpds1ToOpds2(feed: OPDS): OPDSFeed;
