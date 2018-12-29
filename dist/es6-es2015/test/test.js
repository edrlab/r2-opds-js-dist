"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const https = require("https");
const url_1 = require("url");
const JsonUtils_1 = require("r2-utils-js/dist/es6-es2015/src/_utils/JsonUtils");
const ava_1 = require("ava");
const debug_ = require("debug");
const jsonDiff = require("json-diff");
const ta_json_x_1 = require("ta-json-x");
const init_globals_1 = require("../src/opds/init-globals");
const opds2_1 = require("../src/opds/opds2/opds2");
const opds2_publication_1 = require("../src/opds/opds2/opds2-publication");
init_globals_1.initGlobalConverters_OPDS();
init_globals_1.initGlobalConverters_GENERIC();
const debug = debug_("r2:opds#test");
function fn() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Promise.resolve("foo");
    });
}
ava_1.default("dummy async test", (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    debug("test ASYNC");
    t.is(yield fn(), "foo");
}));
function opds2Test(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            debug(url);
            https.get(url, (response) => {
                let str;
                let buffs;
                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                    debug(`${url} ==> ${response.statusCode} (skipped)`);
                    const empty = {
                        feeds: new Set([]),
                        pubs: new Set([]),
                    };
                    resolve(empty);
                    return;
                }
                response.on("data", (chunk) => {
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
                response.on("end", () => {
                    let src;
                    if (str) {
                        src = str;
                    }
                    else if (buffs) {
                        src = Buffer.concat(buffs).toString("utf8");
                    }
                    if (!src) {
                        reject(`Problem loading: ${url}`);
                        return;
                    }
                    const harmonizeDate = (obj) => {
                        ["updated", "published", "since", "until", "modified"].forEach((term) => {
                            if (obj[term]) {
                                if (typeof obj[term] === "string" || typeof obj[term] === "number") {
                                    const date = new Date(obj[term]);
                                    const time = date.getTime();
                                    if (!isNaN(time)) {
                                        const tmp = date.toISOString();
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
                    const harmonizeName = (obj) => {
                        ["subject", "collection", "series", "author", "translator", "editor", "artist", "illustrator", "letterer", "penciler", "colorist", "inker", "narrator", "contributor", "publisher", "imprint"].forEach((term) => {
                            if (obj[term]) {
                                const isArray = obj[term] instanceof Array;
                                const arr = isArray ? obj[term] : [obj[term]];
                                for (let i = 0; i < arr.length; i++) {
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
                    const harmonizeArrays = (obj) => {
                        ["role", "@context", "rel", "language"].forEach((term) => {
                            if (obj[term]) {
                                const isArray = obj[term] instanceof Array;
                                if (!isArray) {
                                    obj[term] = [obj[term]];
                                }
                            }
                        });
                    };
                    let json1 = JSON.parse(src);
                    const isPublication = !json1.publications && !json1.navigation && !json1.groups && json1.metadata;
                    const opds2Feed = isPublication ?
                        ta_json_x_1.JSON.deserialize(json1, opds2_publication_1.OPDSPublication) :
                        ta_json_x_1.JSON.deserialize(json1, opds2_1.OPDSFeed);
                    let json2 = ta_json_x_1.JSON.serialize(opds2Feed);
                    JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                        harmonizeDate(obj);
                    });
                    JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                        harmonizeName(obj);
                    });
                    JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                        harmonizeArrays(obj);
                    });
                    JsonUtils_1.traverseJsonObjects(json2, (obj) => {
                        harmonizeDate(obj);
                    });
                    JsonUtils_1.traverseJsonObjects(json2, (obj) => {
                        harmonizeName(obj);
                    });
                    JsonUtils_1.traverseJsonObjects(json2, (obj) => {
                        harmonizeArrays(obj);
                    });
                    json1 = JsonUtils_1.sortObject(json1);
                    json2 = JsonUtils_1.sortObject(json2);
                    const str1 = JSON.stringify(json1, null, 2);
                    const str2 = JSON.stringify(json2, null, 2);
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
                    const thisUrl = new url_1.URL(url);
                    const thisUrlStr = thisUrl.toString();
                    const feedUrls = new Set();
                    const pubUrls = new Set();
                    JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                        const isFeed = obj.type === "application/opds+json";
                        const isPub = obj.type === "application/opds-publication+json";
                        if (obj.href && (isFeed || isPub)) {
                            const u = new url_1.URL(obj.href, thisUrl);
                            const uStr = u.toString();
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
                    const set = {
                        feeds: feedUrls,
                        pubs: pubUrls,
                    };
                    resolve(set);
                });
            }).on("error", (err) => {
                reject(err);
            });
        });
    });
}
const MAX_TESTS = process.env.MAX_TESTS || 10;
function testUrl(t, url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (alreadyDone.size >= MAX_TESTS) {
            return true;
        }
        alreadyDone.add(url);
        let urls;
        try {
            urls = yield opds2Test(url);
        }
        catch (err) {
            debug(err);
            return false;
        }
        if (urls) {
            const urlsTodoPubs = [];
            urls.pubs.forEach((u) => {
                if (!alreadyDone.has(u)) {
                    urlsTodoPubs.push(u);
                }
            });
            const urlsTodoFeeds = [];
            urls.feeds.forEach((u) => {
                if (!alreadyDone.has(u)) {
                    urlsTodoFeeds.push(u);
                }
            });
            for (const href of urlsTodoPubs) {
                const okay = yield testUrl(t, href, alreadyDone);
                if (!okay) {
                    return false;
                }
            }
            for (const href of urlsTodoFeeds) {
                const okay = yield testUrl(t, href, alreadyDone);
                if (!okay) {
                    return false;
                }
            }
        }
        return true;
    });
}
function delay(okay) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve(okay);
            }, 1000);
        });
    });
}
function runUrlTest(t, url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const done = new Set([]);
        try {
            const okay = yield testUrl(t, url, done);
            debug(done);
            debug(done.size);
            t.true(yield delay(okay));
            return;
        }
        catch (err) {
            debug(err);
        }
        t.true(yield delay(false));
    });
}
ava_1.default("OPDS2 HTTP (de)serialize roundtrip (recursive) 1", (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const url = "https://test.opds.io/2.0/home.json";
    yield runUrlTest(t, url);
}));
ava_1.default("OPDS2 HTTP (de)serialize roundtrip (recursive) 2", (t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const url = "https://catalog.feedbooks.com/catalog/public_domain.json";
    yield runUrlTest(t, url);
}));
//# sourceMappingURL=test.js.map