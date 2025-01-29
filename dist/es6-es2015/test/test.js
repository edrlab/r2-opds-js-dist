"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ava_1 = require("ava");
const debug_ = require("debug");
const http = require("http");
const https = require("https");
const jsonDiff = require("json-diff");
const url_1 = require("url");
const xmldom = require("@xmldom/xmldom");
const serializable_1 = require("r2-lcp-js/dist/es6-es2015/src/serializable");
const publication_1 = require("r2-shared-js/dist/es6-es2015/src/models/publication");
const JsonUtils_1 = require("r2-utils-js/dist/es6-es2015/src/_utils/JsonUtils");
const xml_js_mapper_1 = require("r2-utils-js/dist/es6-es2015/src/_utils/xml-js-mapper");
const bom_1 = require("r2-utils-js/dist/es6-es2015/src/_utils/bom");
const converter_1 = require("../src/opds/converter");
const init_globals_1 = require("../src/opds/init-globals");
const opds_1 = require("../src/opds/opds1/opds");
const opds_entry_1 = require("../src/opds/opds1/opds-entry");
const opds2_1 = require("../src/opds/opds2/opds2");
const opds2_authentication_doc_1 = require("../src/opds/opds2/opds2-authentication-doc");
const opds2_publication_1 = require("../src/opds/opds2/opds2-publication");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
const debug = debug_("r2:opds#test");
const plainTextWithEscapedHtmlChars = `

This &amp; is &#039;a&quot;        test
\tof &lt; summary text &gt;

`;
const xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace = `
<xhtm:div>
    Hello &amp;\t<xhtm:b>  world &lt; &quot;_&#039; &gt;  </xhtm:b>!
</xhtm:div>
`;
const xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace = `
<div xmlns="http://www.w3.org/1999/xhtml">
    Hi &amp;\t<b>  world &lt; &quot;_&#039; &gt;  </b>!
</div>
`;
const xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace = `
<div>
    Oops &amp;\t<b>  world &lt; &quot;_&#039; &gt;  </b>!
</div>
`;
const escapedHtmlWithSomeDoubleEscapedHtmlChars = `
&lt;div&gt;
    Hello &amp;amp;\t&lt;b&gt;  world &amp;lt; &amp;quot;_&amp;#039; &amp;gt;  &lt;/b&gt;!
&lt;/div&gt;
`;
(0, ava_1.default)("OPDS1-2 description: summary + content(XHTML NAMESPACE PREFIX)", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="xhtml">${xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
    t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
    const toMatch = xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
    t.is(opds1Entry.Content.replace(/ xmlns:xhtm="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
    const opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
    t.is(opds2Pub.Metadata.Description.replace(/ xmlns:xhtm="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
}));
(0, ava_1.default)("OPDS1-2 description: summary + content(XHTML NAMESPACE NO PREFIX)", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="xhtml">${xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
    t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
    const toMatch = xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
    t.is(opds1Entry.Content, toMatch);
    const opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
    t.is(opds2Pub.Metadata.Description, toMatch);
}));
(0, ava_1.default)("OPDS1-2 description: summary + content(XML DEFAULT ATOM NAMESPACE)", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="xhtml">${xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
    t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
    const toMatch = xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
    t.is(opds1Entry.Content.replace(/ xmlns="http:\/\/www\.w3\.org\/2005\/Atom"/, ""), toMatch);
    const opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
    t.is(opds2Pub.Metadata.Description.replace(/ xmlns="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
}));
(0, ava_1.default)("OPDS1-2 description: summary", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
    const toMatch = (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars);
    t.is(opds1Entry.Summary, toMatch);
    const opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
    t.is(opds2Pub.Metadata.Description, toMatch);
}));
(0, ava_1.default)("OPDS1-2 description: summary + content(HTML)", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:xhtm="http://www.w3.org/1999/xhtml">
<summary>${plainTextWithEscapedHtmlChars}</summary>
<content type="html">${escapedHtmlWithSomeDoubleEscapedHtmlChars}</content>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
    t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
    const toMatch = (0, converter_1.unescapeHtmlEntities)(escapedHtmlWithSomeDoubleEscapedHtmlChars);
    t.is(opds1Entry.Content, toMatch);
    const opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
    t.is(opds2Pub.Metadata.Description, toMatch);
}));
function fn() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Promise.resolve("foo");
    });
}
(0, ava_1.default)("dummy async test", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    debug("test ASYNC");
    t.is(yield fn(), "foo");
}));
const MAX_TESTS = parseInt(process.env.MAX_TESTS || "0", 10) || 10;
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
                    [
                        "subject",
                        "collection",
                        "series",
                        "author",
                        "translator",
                        "editor",
                        "artist",
                        "illustrator",
                        "letterer",
                        "penciler",
                        "colorist",
                        "inker",
                        "narrator",
                        "contributor",
                        "publisher",
                        "imprint",
                    ].forEach((term) => {
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
                    ["role", "@context", "rel", "language", "conformsTo", "feature"].forEach((term) => {
                        if (obj[term]) {
                            const isArray = obj[term] instanceof Array;
                            if (!isArray) {
                                obj[term] = [obj[term]];
                            }
                        }
                    });
                };
                (0, JsonUtils_1.traverseJsonObjects)(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeDate(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeName(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeArrays(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeBitrateAndTrack(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json1, (obj) => {
                    if (obj !== null) {
                        harmonizeNulls(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeDate(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeName(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeArrays(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeBitrateAndTrack(obj);
                    }
                });
                (0, JsonUtils_1.traverseJsonObjects)(json2, (obj) => {
                    if (obj !== null) {
                        harmonizeNulls(obj);
                    }
                });
                json1 = (0, JsonUtils_1.sortObject)(json1);
                json2 = (0, JsonUtils_1.sortObject)(json2);
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
            const authenticationUrls = new Set();
            (0, JsonUtils_1.traverseJsonObjects)(json1, (obj) => {
                if (obj === null) {
                    return;
                }
                const isFeed = obj.type === "application/opds+json";
                const isPub = obj.type === "application/opds-publication+json";
                const isWebPubManifestAudio = obj.type === "application/audiobook+json";
                const isAuth = obj.type === "application/vnd.opds.authentication.v1.0+json";
                const isWebPubManifest = obj.type === "application/webpub+json" && obj.href && obj.href.indexOf(".epub") < 0;
                if (obj.href && (isFeed || isPub || isWebPubManifest || isWebPubManifestAudio || isAuth)) {
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
                        else if (isAuth) {
                            authenticationUrls.add(uStr);
                        }
                    }
                    else {
                    }
                }
            });
            const set = {
                audiowebpubs: audiowebpubUrls,
                authentications: authenticationUrls,
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
            const proto = /^https:\/\//.test(url) ? https : http;
            proto
                .get(url, (response) => {
                let str;
                let buffs;
                if (response.statusMessage) {
                    debug(`${url} STATUS ==> ${response.statusMessage}`);
                }
                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                    debug(`${url} ==> ${response.statusCode} (skipped)`);
                    const empty = {
                        audiowebpubs: new Set([]),
                        authentications: new Set([]),
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
                    src = src.replace(/"published":\s*"-[^"]+"/g, '"published": "2022-01-01T00:00:00Z"');
                    const json1 = JSON.parse(src);
                    const isPublication = !json1.publications && !json1.navigation && !json1.groups && !json1.catalogs && json1.metadata;
                    const isAuth = !isPublication && json1.authentication;
                    const opds2Feed = isPublication
                        ? (0, serializable_1.TaJsonDeserialize)(json1, opds2_publication_1.OPDSPublication)
                        :
                            isAuth
                                ? (0, serializable_1.TaJsonDeserialize)(json1, opds2_authentication_doc_1.OPDSAuthenticationDoc)
                                : (0, serializable_1.TaJsonDeserialize)(json1, opds2_1.OPDSFeed);
                    const json2 = (0, serializable_1.TaJsonSerialize)(opds2Feed);
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
            })
                .on("error", (err) => {
                debug(`${url} ERROR ==> ${err}`);
                const empty = {
                    audiowebpubs: new Set([]),
                    authentications: new Set([]),
                    feeds: new Set([]),
                    pubs: new Set([]),
                    webpubs: new Set([]),
                };
                resolve(empty);
            });
        });
    });
}
function webpubTest(url, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        alreadyDone.add(url);
        return new Promise((resolve, reject) => {
            debug(url);
            const proto = /^https:\/\//.test(url) ? https : http;
            proto
                .get(url, (response) => {
                let str;
                let buffs;
                if (response.statusMessage) {
                    debug(`${url} STATUS ==> ${response.statusMessage}`);
                }
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
                        pub = (0, serializable_1.TaJsonDeserialize)(json1, publication_1.Publication);
                    }
                    catch (err) {
                        debug(err);
                        reject(err);
                        return;
                    }
                    const json2 = (0, serializable_1.TaJsonSerialize)(pub);
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
            })
                .on("error", (err) => {
                debug(`${url} ERROR ==> ${err}`);
                resolve(true);
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
        const urlsAuths = [];
        urls.authentications.forEach((u) => {
            if (!alreadyDone.has(u)) {
                urlsAuths.push(u);
            }
        });
        for (const href of urlsAuths) {
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
            const proto = /^https:\/\//.test(url) ? https : http;
            proto
                .get(url, (response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let str;
                let buffs;
                if (response.statusMessage) {
                    debug(`${url} STATUS ==> ${response.statusMessage}`);
                }
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
                    const xmlDom = new xmldom.DOMParser().parseFromString((0, bom_1.removeUTF8BOM)(src), "application/xml");
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
                    const opds2Feed = (0, converter_1.convertOpds1ToOpds2)(opds1Feed);
                    const opds2FeedJson = (0, serializable_1.TaJsonSerialize)(opds2Feed);
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
            }))
                .on("error", (err) => {
                debug(`${url} ERROR ==> ${err}`);
                resolve(true);
            });
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
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (accessibility feed)", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://www.feedbooks.com/recent.json?accessibility=accessibility_fully";
    yield runUrlTest(t, url);
}));
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) 1", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://test.opds.io/2.0/home.json";
    yield runUrlTest(t, url);
}));
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) 2", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://catalog.feedbooks.com/catalog/public_domain.json";
    yield runUrlTest(t, url);
}));
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) CATALOGS", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://libraryregistry.librarysimplified.org/libraries";
    yield runUrlTest(t, url);
}));
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) AUTHENTICATION", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "http://acl.simplye-ca.org/CALMDA/authentication_document";
    yield runUrlTest(t, url);
}));
(0, ava_1.default)("OPDS1-2 HTTP convert (de)serialize roundtrip (recursive)", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://bookserver.archive.org/group/openaudiobooks";
    yield runUrlTestAlt(t, url);
}));
(0, ava_1.default)("test", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = "https://api.archivelab.org/books/bookconcord_preface_1202/opds_audio_manifest";
    const done = new Set([]);
    yield webpubTest(url, done);
    debug(done);
    debug(done.size);
    t.true(yield delay(true));
}));
(0, ava_1.default)("OPDS1-2 LCP passphrase convert (de)serialize roundtrip", (t) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const xmlSrc = `
<entry
    xmlns="http://www.w3.org/2005/Atom"
    xmlns:lcp="http://readium.org/lcp-specs/ns">

    <link
        rel="http://opds-spec.org/acquisition/"
        href="FAKE_URL"
        type="application/vnd.readium.lcp.license.v1.0+json">

        <lcp:hashed_passphrase>FAKE_BASE64</lcp:hashed_passphrase>
    </link>
</entry>
    `;
    const xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
    const isEntry = xmlDom.documentElement.localName === "entry";
    t.true(isEntry);
    const opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
    t.is(opds1Entry.Links[0].LcpHashedPassphrase, "FAKE_BASE64");
    const opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
    t.is(opds2Pub.Links[0].Properties.AdditionalJSON.lcp_hashed_passphrase, "FAKE_BASE64");
    const opds2PubJson = (0, serializable_1.TaJsonSerialize)(opds2Pub);
    t.is(opds2PubJson.links[0].properties.lcp_hashed_passphrase, "FAKE_BASE64");
}));
//# sourceMappingURL=test.js.map