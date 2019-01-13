"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var https = require("https");
var url_1 = require("url");
var publication_1 = require("r2-shared-js/dist/es5/src/models/publication");
var JsonUtils_1 = require("r2-utils-js/dist/es5/src/_utils/JsonUtils");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var ava_1 = require("ava");
var debug_ = require("debug");
var jsonDiff = require("json-diff");
var ta_json_x_1 = require("ta-json-x");
var xmldom = require("xmldom");
var converter_1 = require("../src/opds/converter");
var init_globals_1 = require("../src/opds/init-globals");
var opds_1 = require("../src/opds/opds1/opds");
var opds2_1 = require("../src/opds/opds2/opds2");
var opds2_publication_1 = require("../src/opds/opds2/opds2-publication");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
var debug = debug_("r2:opds#test");
function fn() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, Promise.resolve("foo")];
        });
    });
}
ava_1.default("dummy async test", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                debug("test ASYNC");
                _b = (_a = t).is;
                return [4, fn()];
            case 1:
                _b.apply(_a, [_c.sent(), "foo"]);
                return [2];
        }
    });
}); });
var MAX_TESTS = process.env.MAX_TESTS || 10;
var FEEDS_FIRST = process.env.FEEDS_FIRST || false;
function delay(okay) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, new Promise(function (resolve, _reject) {
                    setTimeout(function () {
                        resolve(okay);
                    }, 1000);
                })];
        });
    });
}
function parseCompareJSONs(url, json1, json2) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    if (json1 !== json2) {
                        var harmonizeNulls_1 = function (obj) {
                            if (obj !== null && typeof obj !== "undefined") {
                                if (obj instanceof Array) {
                                    for (var i = obj.length - 1; i >= 0; i--) {
                                        if (obj[i] === null) {
                                            obj.splice(i, 1);
                                        }
                                    }
                                }
                                else if (typeof obj === "object") {
                                    Object.keys(obj).forEach(function (key) {
                                        if (obj[key] === null) {
                                            delete obj[key];
                                        }
                                    });
                                }
                            }
                        };
                        var harmonizeBitrateAndTrack_1 = function (obj) {
                            if (typeof obj.bitrate === "string") {
                                obj.bitrate = parseFloat(obj.bitrate);
                            }
                            if (typeof obj.tracks === "number") {
                                delete obj.tracks;
                            }
                        };
                        var harmonizeDate_1 = function (obj) {
                            ["updated", "published", "since", "until", "modified"].forEach(function (term) {
                                if (obj[term]) {
                                    if (typeof obj[term] === "string" || typeof obj[term] === "number") {
                                        var date = new Date(obj[term]);
                                        var time = date.getTime();
                                        if (!isNaN(time)) {
                                            var tmp = date.toISOString();
                                            if (obj[term] !== tmp) {
                                                obj[term] = tmp;
                                            }
                                        }
                                        else {
                                            console.log("TIME? " + time);
                                        }
                                    }
                                }
                            });
                        };
                        var harmonizeName_1 = function (obj) {
                            ["subject", "collection", "series", "author", "translator", "editor", "artist", "illustrator", "letterer", "penciler", "colorist", "inker", "narrator", "contributor", "publisher", "imprint"].forEach(function (term) {
                                if (obj[term]) {
                                    var isArray = obj[term] instanceof Array;
                                    var arr = isArray ? obj[term] : [obj[term]];
                                    for (var i = 0; i < arr.length; i++) {
                                        if (typeof arr[i] === "string") {
                                            if (isArray) {
                                                obj[term][i] = { name: obj[term][i] };
                                            }
                                            else {
                                                obj[term] = { name: obj[term] };
                                            }
                                        }
                                        else if (typeof arr[i] === "object") {
                                            if (arr[i].name) {
                                                if (typeof arr[i].name === "string") {
                                                }
                                                else if (typeof arr[i].name === "object") {
                                                }
                                            }
                                        }
                                    }
                                    if (!isArray) {
                                        obj[term] = [obj[term]];
                                    }
                                }
                            });
                        };
                        var harmonizeArrays_1 = function (obj) {
                            ["role", "@context", "rel", "language"].forEach(function (term) {
                                if (obj[term]) {
                                    var isArray = obj[term] instanceof Array;
                                    if (!isArray) {
                                        obj[term] = [obj[term]];
                                    }
                                }
                            });
                        };
                        JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeDate_1(obj);
                            }
                        });
                        JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeName_1(obj);
                            }
                        });
                        JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeArrays_1(obj);
                            }
                        });
                        JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeBitrateAndTrack_1(obj);
                            }
                        });
                        JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeNulls_1(obj);
                            }
                        });
                        JsonUtils_1.traverseJsonObjects(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeDate_1(obj);
                            }
                        });
                        JsonUtils_1.traverseJsonObjects(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeName_1(obj);
                            }
                        });
                        JsonUtils_1.traverseJsonObjects(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeArrays_1(obj);
                            }
                        });
                        json1 = JsonUtils_1.sortObject(json1);
                        json2 = JsonUtils_1.sortObject(json2);
                        var str1 = JSON.stringify(json1, null, 2);
                        var str2 = JSON.stringify(json2, null, 2);
                        if (str1 !== str2) {
                            process.stdout.write("###########################\n");
                            process.stdout.write("###########################\n");
                            process.stdout.write("#### JSON DIFF\n");
                            process.stdout.write(jsonDiff.diffString(json1, json2) + "\n");
                            process.stdout.write("###########################\n");
                            process.stdout.write("###########################\n");
                            reject("JSON DIFF! :(");
                            return;
                        }
                    }
                    var thisUrl = new url_1.URL(url);
                    var thisUrlStr = thisUrl.toString();
                    var feedUrls = new Set();
                    var pubUrls = new Set();
                    var webpubUrls = new Set();
                    var audiowebpubUrls = new Set();
                    JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                        if (obj === null) {
                            return;
                        }
                        var isFeed = obj.type === "application/opds+json";
                        var isPub = obj.type === "application/opds-publication+json";
                        var isWebPubManifestAudio = obj.type === "application/audiobook+json";
                        var isWebPubManifest = obj.type === "application/webpub+json" &&
                            obj.href && obj.href.indexOf(".epub") < 0;
                        if (obj.href && (isFeed || isPub || isWebPubManifest || isWebPubManifestAudio)) {
                            var u = new url_1.URL(obj.href, thisUrl);
                            var uStr = u.toString();
                            if (uStr !== thisUrlStr) {
                                if (isFeed) {
                                    feedUrls.add(uStr);
                                }
                                else if (isPub) {
                                    pubUrls.add(uStr);
                                }
                                else if (isWebPubManifest) {
                                    webpubUrls.add(uStr);
                                }
                                else if (isWebPubManifestAudio) {
                                    audiowebpubUrls.add(uStr);
                                }
                            }
                            else {
                            }
                        }
                    });
                    var set = {
                        audiowebpubs: audiowebpubUrls,
                        feeds: feedUrls,
                        pubs: pubUrls,
                        webpubs: webpubUrls,
                    };
                    resolve(set);
                })];
        });
    });
}
function opds2Test(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    debug(url);
                    https.get(url, function (response) {
                        var str;
                        var buffs;
                        if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                            debug(url + " ==> " + response.statusCode + " (skipped)");
                            var empty = {
                                audiowebpubs: new Set([]),
                                feeds: new Set([]),
                                pubs: new Set([]),
                                webpubs: new Set([]),
                            };
                            resolve(empty);
                            return;
                        }
                        response.on("data", function (chunk) {
                            if (typeof chunk === "string") {
                                if (!str) {
                                    str = "";
                                }
                                str += chunk;
                            }
                            else {
                                if (!buffs) {
                                    buffs = [];
                                }
                                buffs.push(chunk);
                            }
                        });
                        response.on("end", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var src, json1, isPublication, opds2Feed, json2, res, err_1;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (str) {
                                            src = str;
                                        }
                                        else if (buffs) {
                                            src = Buffer.concat(buffs).toString("utf8");
                                        }
                                        if (!src) {
                                            reject("Problem loading: " + url);
                                            return [2];
                                        }
                                        json1 = JSON.parse(src);
                                        isPublication = !json1.publications && !json1.navigation && !json1.groups && json1.metadata;
                                        opds2Feed = isPublication ?
                                            ta_json_x_1.JSON.deserialize(json1, opds2_publication_1.OPDSPublication) :
                                            ta_json_x_1.JSON.deserialize(json1, opds2_1.OPDSFeed);
                                        json2 = ta_json_x_1.JSON.serialize(opds2Feed);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, parseCompareJSONs(url, json1, json2)];
                                    case 2:
                                        res = _a.sent();
                                        return [3, 4];
                                    case 3:
                                        err_1 = _a.sent();
                                        debug(err_1);
                                        reject(err_1);
                                        return [2];
                                    case 4:
                                        resolve(res);
                                        return [2];
                                }
                            });
                        }); });
                    }).on("error", function (err) {
                        reject(err);
                    });
                })];
        });
    });
}
function webpubTest(url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            alreadyDone.add(url);
            return [2, new Promise(function (resolve, reject) {
                    debug(url);
                    https.get(url, function (response) {
                        var str;
                        var buffs;
                        if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                            debug(url + " ==> " + response.statusCode + " (skipped)");
                            resolve(true);
                            return;
                        }
                        response.on("data", function (chunk) {
                            if (typeof chunk === "string") {
                                if (!str) {
                                    str = "";
                                }
                                str += chunk;
                            }
                            else {
                                if (!buffs) {
                                    buffs = [];
                                }
                                buffs.push(chunk);
                            }
                        });
                        response.on("end", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var src, json1, pub, json2, err_2;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (str) {
                                            src = str;
                                        }
                                        else if (buffs) {
                                            src = Buffer.concat(buffs).toString("utf8");
                                        }
                                        if (!src) {
                                            reject("Problem loading: " + url);
                                            return [2];
                                        }
                                        json1 = JSON.parse(src);
                                        try {
                                            pub = ta_json_x_1.JSON.deserialize(json1, publication_1.Publication);
                                        }
                                        catch (err) {
                                            debug(err);
                                            reject(err);
                                            return [2];
                                        }
                                        json2 = ta_json_x_1.JSON.serialize(pub);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, parseCompareJSONs(url, json1, json2)];
                                    case 2:
                                        _a.sent();
                                        return [3, 4];
                                    case 3:
                                        err_2 = _a.sent();
                                        debug(err_2);
                                        reject(err_2);
                                        return [2];
                                    case 4:
                                        resolve(true);
                                        return [2];
                                }
                            });
                        }); });
                    }).on("error", function (err) {
                        reject(err);
                    });
                })];
        });
    });
}
function recursePubs(t, urls, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var urlsTodoWebPubs, _i, urlsTodoWebPubs_1, href, okay, err_3, urlsTodoAudioWebPubs, _a, urlsTodoAudioWebPubs_1, href, okay, err_4, urlsTodoPubs, _b, urlsTodoPubs_1, href, okay;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    urlsTodoWebPubs = [];
                    urls.webpubs.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsTodoWebPubs.push(u);
                        }
                    });
                    _i = 0, urlsTodoWebPubs_1 = urlsTodoWebPubs;
                    _c.label = 1;
                case 1:
                    if (!(_i < urlsTodoWebPubs_1.length)) return [3, 6];
                    href = urlsTodoWebPubs_1[_i];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4, webpubTest(href, alreadyDone)];
                case 3:
                    okay = _c.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    return [3, 5];
                case 4:
                    err_3 = _c.sent();
                    debug(err_3);
                    return [2, false];
                case 5:
                    _i++;
                    return [3, 1];
                case 6:
                    urlsTodoAudioWebPubs = [];
                    urls.audiowebpubs.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsTodoAudioWebPubs.push(u);
                        }
                    });
                    _a = 0, urlsTodoAudioWebPubs_1 = urlsTodoAudioWebPubs;
                    _c.label = 7;
                case 7:
                    if (!(_a < urlsTodoAudioWebPubs_1.length)) return [3, 12];
                    href = urlsTodoAudioWebPubs_1[_a];
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 11]);
                    return [4, webpubTest(href, alreadyDone)];
                case 9:
                    okay = _c.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    return [3, 11];
                case 10:
                    err_4 = _c.sent();
                    debug(err_4);
                    return [2, false];
                case 11:
                    _a++;
                    return [3, 7];
                case 12:
                    urlsTodoPubs = [];
                    urls.pubs.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsTodoPubs.push(u);
                        }
                    });
                    _b = 0, urlsTodoPubs_1 = urlsTodoPubs;
                    _c.label = 13;
                case 13:
                    if (!(_b < urlsTodoPubs_1.length)) return [3, 16];
                    href = urlsTodoPubs_1[_b];
                    return [4, testUrl(t, href, alreadyDone)];
                case 14:
                    okay = _c.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    _c.label = 15;
                case 15:
                    _b++;
                    return [3, 13];
                case 16: return [2, true];
            }
        });
    });
}
function recurseFeeds(t, urls, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var urlsTodoFeeds, _i, urlsTodoFeeds_1, href, okay;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urlsTodoFeeds = [];
                    urls.feeds.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsTodoFeeds.push(u);
                        }
                    });
                    _i = 0, urlsTodoFeeds_1 = urlsTodoFeeds;
                    _a.label = 1;
                case 1:
                    if (!(_i < urlsTodoFeeds_1.length)) return [3, 4];
                    href = urlsTodoFeeds_1[_i];
                    return [4, testUrl(t, href, alreadyDone)];
                case 2:
                    okay = _a.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2, true];
            }
        });
    });
}
function recurse(t, urls, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var b1, b2, b3, b4;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!FEEDS_FIRST) return [3, 3];
                    return [4, recurseFeeds(t, urls, alreadyDone)];
                case 1:
                    b1 = _a.sent();
                    if (!b1) {
                        return [2, b1];
                    }
                    return [4, recursePubs(t, urls, alreadyDone)];
                case 2:
                    b2 = _a.sent();
                    return [2, b2];
                case 3: return [4, recursePubs(t, urls, alreadyDone)];
                case 4:
                    b3 = _a.sent();
                    if (!b3) {
                        return [2, b3];
                    }
                    return [4, recurseFeeds(t, urls, alreadyDone)];
                case 5:
                    b4 = _a.sent();
                    return [2, b4];
            }
        });
    });
}
function testUrl(t, url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var urls, err_5;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (alreadyDone.size >= MAX_TESTS) {
                        return [2, true];
                    }
                    alreadyDone.add(url);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, opds2Test(url)];
                case 2:
                    urls = _a.sent();
                    return [3, 4];
                case 3:
                    err_5 = _a.sent();
                    debug(err_5);
                    return [2, false];
                case 4:
                    if (!urls) return [3, 6];
                    return [4, recurse(t, urls, alreadyDone)];
                case 5: return [2, _a.sent()];
                case 6: return [2, true];
            }
        });
    });
}
function testUrlAlt(t, url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var promise;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (alreadyDone.size >= MAX_TESTS) {
                        return [2, true];
                    }
                    alreadyDone.add(url);
                    promise = new Promise(function (resolve, reject) {
                        https.get(url, function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var str, buffs;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                                    debug(url + " ==> " + response.statusCode + " (skipped)");
                                    resolve(true);
                                    return [2];
                                }
                                response.on("data", function (chunk) {
                                    if (typeof chunk === "string") {
                                        if (!str) {
                                            str = "";
                                        }
                                        str += chunk;
                                    }
                                    else {
                                        if (!buffs) {
                                            buffs = [];
                                        }
                                        buffs.push(chunk);
                                    }
                                });
                                response.on("end", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var src, xmlDom, isEntry, opds1Feed, opds2Feed, opds2FeedJson, urls, err_6, b;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (str) {
                                                    src = str;
                                                }
                                                else if (buffs) {
                                                    src = Buffer.concat(buffs).toString("utf8");
                                                }
                                                if (!src) {
                                                    debug("Problem loading: " + url + " (skip)");
                                                    resolve(true);
                                                    return [2];
                                                }
                                                xmlDom = new xmldom.DOMParser().parseFromString(src);
                                                if (!xmlDom || !xmlDom.documentElement) {
                                                    reject("Problem parsing OPDS1 XML. Fail.");
                                                    return [2];
                                                }
                                                isEntry = xmlDom.documentElement.localName === "entry";
                                                if (isEntry) {
                                                    debug("Expecting OPDS1 Feed, not Entry. Skip.");
                                                    resolve(true);
                                                    return [2];
                                                }
                                                opds1Feed = xml_js_mapper_1.XML.deserialize(xmlDom, opds_1.OPDS);
                                                opds2Feed = converter_1.convertOpds1ToOpds2(opds1Feed);
                                                opds2FeedJson = ta_json_x_1.JSON.serialize(opds2Feed);
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                return [4, parseCompareJSONs(url, opds2FeedJson, opds2FeedJson)];
                                            case 2:
                                                urls = _a.sent();
                                                return [3, 4];
                                            case 3:
                                                err_6 = _a.sent();
                                                reject(err_6);
                                                return [2];
                                            case 4:
                                                if (!urls) return [3, 6];
                                                return [4, recurse(t, urls, alreadyDone)];
                                            case 5:
                                                b = _a.sent();
                                                resolve(b);
                                                return [2];
                                            case 6:
                                                resolve(true);
                                                return [2];
                                        }
                                    });
                                }); });
                                return [2];
                            });
                        }); }).on("error", function (err) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                reject(err);
                                return [2];
                            });
                        }); });
                    });
                    return [4, promise];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
function runUrlTest(t, url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var done, okay, _a, _b, err_7, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    done = new Set([]);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    return [4, testUrl(t, url, done)];
                case 2:
                    okay = _e.sent();
                    debug(done);
                    debug(done.size);
                    _b = (_a = t).true;
                    return [4, delay(okay)];
                case 3:
                    _b.apply(_a, [_e.sent()]);
                    return [2];
                case 4:
                    err_7 = _e.sent();
                    debug(err_7);
                    return [3, 5];
                case 5:
                    _d = (_c = t).true;
                    return [4, delay(false)];
                case 6:
                    _d.apply(_c, [_e.sent()]);
                    return [2];
            }
        });
    });
}
function runUrlTestAlt(t, url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var done, okay, _a, _b, err_8, _c, _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    done = new Set([]);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    return [4, testUrlAlt(t, url, done)];
                case 2:
                    okay = _e.sent();
                    debug(done);
                    debug(done.size);
                    _b = (_a = t).true;
                    return [4, delay(okay)];
                case 3:
                    _b.apply(_a, [_e.sent()]);
                    return [2];
                case 4:
                    err_8 = _e.sent();
                    debug(err_8);
                    return [3, 5];
                case 5:
                    _d = (_c = t).true;
                    return [4, delay(false)];
                case 6:
                    _d.apply(_c, [_e.sent()]);
                    return [2];
            }
        });
    });
}
ava_1.default("OPDS2 HTTP (de)serialize roundtrip (recursive) 1", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var url;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://test.opds.io/2.0/home.json";
                return [4, runUrlTest(t, url)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
ava_1.default("OPDS2 HTTP (de)serialize roundtrip (recursive) 2", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var url;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://catalog.feedbooks.com/catalog/public_domain.json";
                return [4, runUrlTest(t, url)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
ava_1.default("OPDS1-2 HTTP convert (de)serialize roundtrip (recursive)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var url;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://bookserver.archive.org/group/openaudiobooks";
                return [4, runUrlTestAlt(t, url)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
//# sourceMappingURL=test.js.map