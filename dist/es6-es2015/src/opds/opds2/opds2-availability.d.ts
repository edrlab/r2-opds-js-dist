export declare enum OPDSAvailabilityEnum {
    Available = "available",
    Unavailable = "unavailable",
    Reserved = "reserved",
    Ready = "ready"
}
export declare class OPDSAvailability {
    State: string;
    Since: Date;
    Until: Date;
    protected _OnDeserialized(): void;
}
