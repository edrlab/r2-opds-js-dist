import { ExecutionContext } from "ava";
export declare function inspect(obj: any): void;
export declare function log(str: string): void;
export declare function logJSON(json: any): void;
export declare function checkDate(t: ExecutionContext, d1: Date, d2: Date): void;
export declare function checkType(t: ExecutionContext, obj: any, clazz: Function): void;
export declare function checkType_String(t: ExecutionContext, obj: any): void;
export declare function checkType_Array(t: ExecutionContext, obj: any): void;
export declare function checkType_Object(t: ExecutionContext, obj: any): void;
