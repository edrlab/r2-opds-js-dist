"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkType_Object = exports.checkType_Array = exports.checkType_Number = exports.checkType_String = exports.checkType = exports.checkNumber = exports.checkDate = exports.logJSON = exports.log = exports.inspect = void 0;
var util = require("util");
function inspect(obj) {
    if (!process.env.DEBUG || process.env.DEBUG === "false" || process.env.DEBUG === "0") {
        return;
    }
    console.log(util.inspect(obj, { showHidden: false, depth: 1000, colors: true, customInspect: true }));
}
exports.inspect = inspect;
function log(str) {
    if (!process.env.DEBUG || process.env.DEBUG === "false" || process.env.DEBUG === "0") {
        return;
    }
    console.log(str);
}
exports.log = log;
function logJSON(json) {
    if (!process.env.DEBUG || process.env.DEBUG === "false" || process.env.DEBUG === "0") {
        return;
    }
    var jsonStr = global.JSON.stringify(json, null, "");
    log(jsonStr);
}
exports.logJSON = logJSON;
function checkDate(t, d1, d2) {
    t.true(d1.getTime() === d2.getTime());
    t.true(d1.toString() === d2.toString());
    t.true(+d1 === +d2);
    t.true(d1 >= d2 && d1 <= d2);
}
exports.checkDate = checkDate;
function checkNumber(t, d1, d2) {
    t.is(d1, d2);
    t.true(d1 === d2);
}
exports.checkNumber = checkNumber;
function checkType(t, obj, clazz) {
    t.is(typeof obj, "object");
    t.true(obj instanceof clazz);
    t.is(obj.constructor, clazz);
}
exports.checkType = checkType;
function checkType_String(t, obj) {
    t.is(typeof obj, "string");
    t.false(obj instanceof String);
    t.false(obj instanceof Object);
    t.is(obj.constructor, String);
}
exports.checkType_String = checkType_String;
function checkType_Number(t, obj) {
    t.is(typeof obj, "number");
    t.false(obj instanceof String);
    t.false(obj instanceof Object);
    t.false(obj instanceof Number);
    t.is(obj.constructor, Number);
}
exports.checkType_Number = checkType_Number;
function checkType_Array(t, obj) {
    t.is(typeof obj, "object");
    t.true(obj instanceof Array);
    t.true(obj instanceof Object);
    t.is(obj.constructor, Array);
}
exports.checkType_Array = checkType_Array;
function checkType_Object(t, obj) {
    checkType(t, obj, Object);
}
exports.checkType_Object = checkType_Object;
//# sourceMappingURL=helpers.js.map