import { TestContext } from "ava";
export declare function inspect(obj: any): void;
export declare function log(str: string): void;
export declare function logJSON(json: any): void;
export declare function checkDate(t: TestContext, d1: Date, d2: Date): void;
export declare function checkType(t: TestContext, obj: any, clazz: Function): void;
export declare function checkType_String(t: TestContext, obj: any): void;
export declare function checkType_Array(t: TestContext, obj: any): void;
export declare function checkType_Object(t: TestContext, obj: any): void;
