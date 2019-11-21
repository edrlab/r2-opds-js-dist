import { Link } from "r2-shared-js/dist/es5/src/models/publication-link";
import { OPDSProperties } from "./opds2-properties";
export declare enum OPDSLinkRelEnum {
    Preview = "preview",
    PreviewURI = "http://opds-spec.org/acquisition/preview",
    AcquisitionURI = "http://opds-spec.org/acquisition",
    BuyURI = "http://opds-spec.org/acquisition/buy",
    OpenAccessURI = "http://opds-spec.org/acquisition/open-access",
    BorrowURI = "http://opds-spec.org/acquisition/borrow",
    SampleURI = "http://opds-spec.org/acquisition/sample",
    SubscribeURI = "http://opds-spec.org/acquisition/subscribe"
}
export declare class OPDSLink extends Link {
    Properties: OPDSProperties;
}
