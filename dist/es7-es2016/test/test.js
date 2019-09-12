"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ava_1 = require("ava");
const debug_ = require("debug");
const https = require("https");
const jsonDiff = require("json-diff");
const ta_json_x_1 = require("ta-json-x");
const url_1 = require("url");
const xmldom = require("xmldom");
const publication_1 = require("r2-shared-js/dist/es7-es2016/src/models/publication");
const JsonUtils_1 = require("r2-utils-js/dist/es7-es2016/src/_utils/JsonUtils");
const xml_js_mapper_1 = require("r2-utils-js/dist/es7-es2016/src/_utils/xml-js-mapper");
const converter_1 = require("../src/opds/converter");
const init_globals_1 = require("../src/opds/init-globals");
const opds_1 = require("../src/opds/opds1/opds");
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
ava_1.default("dummy async test", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    debug("test ASYNC");
    t.is(yield fn(), "foo");
}));
const MAX_TESTS = process.env.MAX_TESTS || 10;
const FEEDS_FIRST = process.env.FEEDS_FIRST || false;
function delay(okay) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve(okay);
            }, 1000);
        });
    });
}
function parseCompareJSONs(url, json1, json2) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (json1 !== json2) {
                const harmonizeNulls = (obj) => {
                    if (obj !== null && typeof obj !== "undefined") {
                        if (obj instanceof Array) {
                            for (let i = obj.length - 1; i >= 0; i--) {
                                if (obj[i] === null) {
                                    obj.splice(i, 1);
                                }
                            }
                        }
                        else if (typeof obj === "object") {
                            Object.keys(obj).forEach((key) => {
                                if (obj[key] === null) {
                                    delete obj[key];
                                }
                            });
                        }
                    }
                };
                const harmonizeBitrateAndTrack = (obj) => {
                    if (typeof obj.bitrate === "string") {
                        obj.bitrate = parseFloat(obj.bitrate);
                    }
                    if (typeof obj.tracks === "number") {
                        delete obj.tracks;
                    }
                };
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
                JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeDate(obj);
                    }
                });
                JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeName(obj);
                    }
                });
                JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeArrays(obj);
                    }
                });
                JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeBitrateAndTrack(obj);
                    }
                });
                JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeNulls(obj);
                    }
                });
                JsonUtils_1.traverseJsonObjects(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeDate(obj);
                    }
                });
                JsonUtils_1.traverseJsonObjects(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeName(obj);
                    }
                });
                JsonUtils_1.traverseJsonObjects(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeArrays(obj);
                    }
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
            }
            const thisUrl = new url_1.URL(url);
            const thisUrlStr = thisUrl.toString();
            const feedUrls = new Set();
            const pubUrls = new Set();
            const webpubUrls = new Set();
            const audiowebpubUrls = new Set();
            JsonUtils_1.traverseJsonObjects(json1, (obj) => {
                if (obj === null) {
                    return;
                }
                const isFeed = obj.type === "application/opds+json";
                const isPub = obj.type === "application/opds-publication+json";
                const isWebPubManifestAudio = obj.type === "application/audiobook+json";
                const isWebPubManifest = obj.type === "application/webpub+json" &&
                    obj.href && obj.href.indexOf(".epub") < 0;
                if (obj.href && (isFeed || isPub || isWebPubManifest || isWebPubManifestAudio)) {
                    const u = new url_1.URL(obj.href, thisUrl);
                    const uStr = u.toString();
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
            const set = {
                audiowebpubs: audiowebpubUrls,
                feeds: feedUrls,
                pubs: pubUrls,
                webpubs: webpubUrls,
            };
            resolve(set);
        });
    });
}
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
                        audiowebpubs: new Set([]),
                        feeds: new Set([]),
                        pubs: new Set([]),
                        webpubs: new Set([]),
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
                response.on("end", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    const json1 = JSON.parse(src);
                    const isPublication = !json1.publications && !json1.navigation && !json1.groups && json1.metadata;
                    const opds2Feed = isPublication ?
                        ta_json_x_1.JSON.deserialize(json1, opds2_publication_1.OPDSPublication) :
                        ta_json_x_1.JSON.deserialize(json1, opds2_1.OPDSFeed);
                    const json2 = ta_json_x_1.JSON.serialize(opds2Feed);
                    let res;
                    try {
                        res = yield parseCompareJSONs(url, json1, json2);
                    }
                    catch (err) {
                        debug(err);
                        reject(err);
                        return;
                    }
                    resolve(res);
                }));
            }).on("error", (err) => {
                reject(err);
            });
        });
    });
}
function webpubTest(url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        alreadyDone.add(url);
        return new Promise((resolve, reject) => {
            debug(url);
            https.get(url, (response) => {
                let str;
                let buffs;
                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                    debug(`${url} ==> ${response.statusCode} (skipped)`);
                    resolve(true);
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
                response.on("end", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    const json1 = JSON.parse(src);
                    let pub;
                    try {
                        pub = ta_json_x_1.JSON.deserialize(json1, publication_1.Publication);
                    }
                    catch (err) {
                        debug(err);
                        reject(err);
                        return;
                    }
                    const json2 = ta_json_x_1.JSON.serialize(pub);
                    try {
                        yield parseCompareJSONs(url, json1, json2);
                    }
                    catch (err) {
                        debug(err);
                        reject(err);
                        return;
                    }
                    resolve(true);
                }));
            }).on("error", (err) => {
                reject(err);
            });
        });
    });
}
function recursePubs(t, urls, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const urlsTodoWebPubs = [];
        urls.webpubs.forEach((u) => {
            if (!alreadyDone.has(u)) {
                urlsTodoWebPubs.push(u);
            }
        });
        for (const href of urlsTodoWebPubs) {
            try {
                const okay = yield webpubTest(href, alreadyDone);
                if (!okay) {
                    return false;
                }
            }
            catch (err) {
                debug(err);
                return false;
            }
        }
        const urlsTodoAudioWebPubs = [];
        urls.audiowebpubs.forEach((u) => {
            if (!alreadyDone.has(u)) {
                urlsTodoAudioWebPubs.push(u);
            }
        });
        for (const href of urlsTodoAudioWebPubs) {
            try {
                const okay = yield webpubTest(href, alreadyDone);
                if (!okay) {
                    return false;
                }
            }
            catch (err) {
                debug(err);
                return false;
            }
        }
        const urlsTodoPubs = [];
        urls.pubs.forEach((u) => {
            if (!alreadyDone.has(u)) {
                urlsTodoPubs.push(u);
            }
        });
        for (const href of urlsTodoPubs) {
            const okay = yield testUrl(t, href, alreadyDone);
            if (!okay) {
                return false;
            }
        }
        return true;
    });
}
function recurseFeeds(t, urls, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const urlsTodoFeeds = [];
        urls.feeds.forEach((u) => {
            if (!alreadyDone.has(u)) {
                urlsTodoFeeds.push(u);
            }
        });
        for (const href of urlsTodoFeeds) {
            const okay = yield testUrl(t, href, alreadyDone);
            if (!okay) {
                return false;
            }
        }
        return true;
    });
}
function recurse(t, urls, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (FEEDS_FIRST) {
            const b1 = yield recurseFeeds(t, urls, alreadyDone);
            if (!b1) {
                return b1;
            }
            const b2 = yield recursePubs(t, urls, alreadyDone);
            return b2;
        }
        const b3 = yield recursePubs(t, urls, alreadyDone);
        if (!b3) {
            return b3;
        }
        const b4 = yield recurseFeeds(t, urls, alreadyDone);
        return b4;
    });
}
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
            return yield recurse(t, urls, alreadyDone);
        }
        return true;
    });
}
function testUrlAlt(t, url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (alreadyDone.size >= MAX_TESTS) {
            return true;
        }
        alreadyDone.add(url);
        const promise = new Promise((resolve, reject) => {
            https.get(url, (response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let str;
                let buffs;
                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                    debug(`${url} ==> ${response.statusCode} (skipped)`);
                    resolve(true);
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
                response.on("end", () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    let src;
                    if (str) {
                        src = str;
                    }
                    else if (buffs) {
                        src = Buffer.concat(buffs).toString("utf8");
                    }
                    if (!src) {
                        debug(`Problem loading: ${url} (skip)`);
                        resolve(true);
                        return;
                    }
                    const xmlDom = new xmldom.DOMParser().parseFromString(src);
                    if (!xmlDom || !xmlDom.documentElement) {
                        reject("Problem parsing OPDS1 XML. Fail.");
                        return;
                    }
                    const isEntry = xmlDom.documentElement.localName === "entry";
                    if (isEntry) {
                        debug("Expecting OPDS1 Feed, not Entry. Skip.");
                        resolve(true);
                        return;
                    }
                    const opds1Feed = xml_js_mapper_1.XML.deserialize(xmlDom, opds_1.OPDS);
                    const opds2Feed = converter_1.convertOpds1ToOpds2(opds1Feed);
                    const opds2FeedJson = ta_json_x_1.JSON.serialize(opds2Feed);
                    let urls;
                    try {
                        urls = yield parseCompareJSONs(url, opds2FeedJson, opds2FeedJson);
                    }
                    catch (err) {
                        reject(err);
                        return;
                    }
                    if (urls) {
                        const b = yield recurse(t, urls, alreadyDone);
                        resolve(b);
                        return;
                    }
                    resolve(true);
                    return;
                }));
            })).on("error", (err) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                reject(err);
                return;
            }));
        });
        return yield promise;
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
function runUrlTestAlt(t, url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const done = new Set([]);
        try {
            const okay = yield testUrlAlt(t, url, done);
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
ava_1.default("OPDS2 HTTP (de)serialize roundtrip (recursive) 1", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://test.opds.io/2.0/home.json";
    yield runUrlTest(t, url);
}));
ava_1.default("OPDS2 HTTP (de)serialize roundtrip (recursive) 2", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://catalog.feedbooks.com/catalog/public_domain.json";
    yield runUrlTest(t, url);
}));
ava_1.default("OPDS1-2 HTTP convert (de)serialize roundtrip (recursive)", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://bookserver.archive.org/group/openaudiobooks";
    yield runUrlTestAlt(t, url);
}));
//# sourceMappingURL=test.js.map