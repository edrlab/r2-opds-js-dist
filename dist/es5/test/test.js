"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var https = require("https");
var url_1 = require("url");
var JsonUtils_1 = require("r2-utils-js/dist/es5/src/_utils/JsonUtils");
var ava_1 = require("ava");
var debug_ = require("debug");
var jsonDiff = require("json-diff");
var ta_json_x_1 = require("ta-json-x");
var init_globals_1 = require("../src/opds/init-globals");
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
function opds2Test(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    debug(url);
                    https.get(url, function (response) {
                        var str;
                        var buffs;
                        if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                            debug(url + " ==> " + response.statusCode + " (skipped)");
                            var empty = {
                                feeds: new Set([]),
                                pubs: new Set([]),
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
                        response.on("end", function () {
                            var src;
                            if (str) {
                                src = str;
                            }
                            else if (buffs) {
                                src = Buffer.concat(buffs).toString("utf8");
                            }
                            if (!src) {
                                reject("Problem loading: " + url);
                                return;
                            }
                            var harmonizeDate = function (obj) {
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
                            var harmonizeName = function (obj) {
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
                            var harmonizeArrays = function (obj) {
                                ["role", "@context", "rel", "language"].forEach(function (term) {
                                    if (obj[term]) {
                                        var isArray = obj[term] instanceof Array;
                                        if (!isArray) {
                                            obj[term] = [obj[term]];
                                        }
                                    }
                                });
                            };
                            var json1 = JSON.parse(src);
                            var isPublication = !json1.publications && !json1.navigation && !json1.groups && json1.metadata;
                            var opds2Feed = isPublication ?
                                ta_json_x_1.JSON.deserialize(json1, opds2_publication_1.OPDSPublication) :
                                ta_json_x_1.JSON.deserialize(json1, opds2_1.OPDSFeed);
                            var json2 = ta_json_x_1.JSON.serialize(opds2Feed);
                            JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                                harmonizeDate(obj);
                            });
                            JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                                harmonizeName(obj);
                            });
                            JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                                harmonizeArrays(obj);
                            });
                            JsonUtils_1.traverseJsonObjects(json2, function (obj) {
                                harmonizeDate(obj);
                            });
                            JsonUtils_1.traverseJsonObjects(json2, function (obj) {
                                harmonizeName(obj);
                            });
                            JsonUtils_1.traverseJsonObjects(json2, function (obj) {
                                harmonizeArrays(obj);
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
                            var thisUrl = new url_1.URL(url);
                            var thisUrlStr = thisUrl.toString();
                            var feedUrls = new Set();
                            var pubUrls = new Set();
                            JsonUtils_1.traverseJsonObjects(json1, function (obj) {
                                var isFeed = obj.type === "application/opds+json";
                                var isPub = obj.type === "application/opds-publication+json";
                                if (obj.href && (isFeed || isPub)) {
                                    var u = new url_1.URL(obj.href, thisUrl);
                                    var uStr = u.toString();
                                    if (uStr !== thisUrlStr) {
                                        if (isFeed) {
                                            feedUrls.add(uStr);
                                        }
                                        else if (isPub) {
                                            pubUrls.add(uStr);
                                        }
                                    }
                                    else {
                                    }
                                }
                            });
                            var set = {
                                feeds: feedUrls,
                                pubs: pubUrls,
                            };
                            resolve(set);
                        });
                    }).on("error", function (err) {
                        reject(err);
                    });
                })];
        });
    });
}
var MAX_TESTS = process.env.MAX_TESTS || 10;
function testUrl(t, url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var urls, err_1, urlsTodoPubs_2, urlsTodoFeeds_2, _i, urlsTodoPubs_1, href, okay, _a, urlsTodoFeeds_1, href, okay;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (alreadyDone.size >= MAX_TESTS) {
                        return [2, true];
                    }
                    alreadyDone.add(url);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, opds2Test(url)];
                case 2:
                    urls = _b.sent();
                    return [3, 4];
                case 3:
                    err_1 = _b.sent();
                    debug(err_1);
                    return [2, false];
                case 4:
                    if (!urls) return [3, 12];
                    urlsTodoPubs_2 = [];
                    urls.pubs.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsTodoPubs_2.push(u);
                        }
                    });
                    urlsTodoFeeds_2 = [];
                    urls.feeds.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsTodoFeeds_2.push(u);
                        }
                    });
                    _i = 0, urlsTodoPubs_1 = urlsTodoPubs_2;
                    _b.label = 5;
                case 5:
                    if (!(_i < urlsTodoPubs_1.length)) return [3, 8];
                    href = urlsTodoPubs_1[_i];
                    return [4, testUrl(t, href, alreadyDone)];
                case 6:
                    okay = _b.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3, 5];
                case 8:
                    _a = 0, urlsTodoFeeds_1 = urlsTodoFeeds_2;
                    _b.label = 9;
                case 9:
                    if (!(_a < urlsTodoFeeds_1.length)) return [3, 12];
                    href = urlsTodoFeeds_1[_a];
                    return [4, testUrl(t, href, alreadyDone)];
                case 10:
                    okay = _b.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    _b.label = 11;
                case 11:
                    _a++;
                    return [3, 9];
                case 12: return [2, true];
            }
        });
    });
}
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
function runUrlTest(t, url) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var done, okay, _a, _b, err_2, _c, _d;
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
                    err_2 = _e.sent();
                    debug(err_2);
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
//# sourceMappingURL=test.js.map