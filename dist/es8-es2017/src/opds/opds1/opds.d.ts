import { Author } from "./opds-author";
import { Entry } from "./opds-entry";
import { Link } from "./opds-link";
export declare class OPDS {
    OpensearchTotalResults: number;
    OpensearchItemsPerPage: number;
    Id: string;
    Title: string;
    SubTitle: string;
    Updated: Date;
    Icon: string;
    Authors: Author[];
    Lang: string;
    Links: Link[];
    Entries: Entry[];
}
