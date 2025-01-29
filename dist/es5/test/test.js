"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = require("ava");
var debug_ = require("debug");
var http = require("http");
var https = require("https");
var jsonDiff = require("json-diff");
var url_1 = require("url");
var xmldom = require("@xmldom/xmldom");
var serializable_1 = require("r2-lcp-js/dist/es5/src/serializable");
var publication_1 = require("r2-shared-js/dist/es5/src/models/publication");
var JsonUtils_1 = require("r2-utils-js/dist/es5/src/_utils/JsonUtils");
var xml_js_mapper_1 = require("r2-utils-js/dist/es5/src/_utils/xml-js-mapper");
var bom_1 = require("r2-utils-js/dist/es5/src/_utils/bom");
var converter_1 = require("../src/opds/converter");
var init_globals_1 = require("../src/opds/init-globals");
var opds_1 = require("../src/opds/opds1/opds");
var opds_entry_1 = require("../src/opds/opds1/opds-entry");
var opds2_1 = require("../src/opds/opds2/opds2");
var opds2_authentication_doc_1 = require("../src/opds/opds2/opds2-authentication-doc");
var opds2_publication_1 = require("../src/opds/opds2/opds2-publication");
(0, init_globals_1.initGlobalConverters_OPDS)();
(0, init_globals_1.initGlobalConverters_GENERIC)();
var debug = debug_("r2:opds#test");
var plainTextWithEscapedHtmlChars = "\n\nThis &amp; is &#039;a&quot;        test\n\tof &lt; summary text &gt;\n\n";
var xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace = "\n<xhtm:div>\n    Hello &amp;\t<xhtm:b>  world &lt; &quot;_&#039; &gt;  </xhtm:b>!\n</xhtm:div>\n";
var xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace = "\n<div xmlns=\"http://www.w3.org/1999/xhtml\">\n    Hi &amp;\t<b>  world &lt; &quot;_&#039; &gt;  </b>!\n</div>\n";
var xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace = "\n<div>\n    Oops &amp;\t<b>  world &lt; &quot;_&#039; &gt;  </b>!\n</div>\n";
var escapedHtmlWithSomeDoubleEscapedHtmlChars = "\n&lt;div&gt;\n    Hello &amp;amp;\t&lt;b&gt;  world &amp;lt; &amp;quot;_&amp;#039; &amp;gt;  &lt;/b&gt;!\n&lt;/div&gt;\n";
(0, ava_1.default)("OPDS1-2 description: summary + content(XHTML NAMESPACE PREFIX)", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var xmlSrc, xmlDom, isEntry, opds1Entry, toMatch, opds2Pub;
    return tslib_1.__generator(this, function (_a) {
        xmlSrc = "\n<entry\n    xmlns=\"http://www.w3.org/2005/Atom\"\n    xmlns:xhtm=\"http://www.w3.org/1999/xhtml\">\n<summary>".concat(plainTextWithEscapedHtmlChars, "</summary>\n<content type=\"xhtml\">").concat(xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace, "</content>\n</entry>\n    ");
        xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
        isEntry = xmlDom.documentElement.localName === "entry";
        t.true(isEntry);
        opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
        t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
        toMatch = xhtmlWithSomeEscapedHtmlCharsPrefixedNamespace
            .replace(/&quot;/g, "\"")
            .replace(/&#039;/g, "'");
        t.is(opds1Entry.Content.replace(/ xmlns:xhtm="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
        opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
        t.is(opds2Pub.Metadata.Description.replace(/ xmlns:xhtm="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
        return [2];
    });
}); });
(0, ava_1.default)("OPDS1-2 description: summary + content(XHTML NAMESPACE NO PREFIX)", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var xmlSrc, xmlDom, isEntry, opds1Entry, toMatch, opds2Pub;
    return tslib_1.__generator(this, function (_a) {
        xmlSrc = "\n<entry\n    xmlns=\"http://www.w3.org/2005/Atom\"\n    xmlns:xhtm=\"http://www.w3.org/1999/xhtml\">\n<summary>".concat(plainTextWithEscapedHtmlChars, "</summary>\n<content type=\"xhtml\">").concat(xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace, "</content>\n</entry>\n    ");
        xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
        isEntry = xmlDom.documentElement.localName === "entry";
        t.true(isEntry);
        opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
        t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
        toMatch = xhtmlWithSomeEscapedHtmlCharsNoPrefixedNamespace
            .replace(/&quot;/g, "\"")
            .replace(/&#039;/g, "'");
        t.is(opds1Entry.Content, toMatch);
        opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
        t.is(opds2Pub.Metadata.Description, toMatch);
        return [2];
    });
}); });
(0, ava_1.default)("OPDS1-2 description: summary + content(XML DEFAULT ATOM NAMESPACE)", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var xmlSrc, xmlDom, isEntry, opds1Entry, toMatch, opds2Pub;
    return tslib_1.__generator(this, function (_a) {
        xmlSrc = "\n<entry\n    xmlns=\"http://www.w3.org/2005/Atom\"\n    xmlns:xhtm=\"http://www.w3.org/1999/xhtml\">\n<summary>".concat(plainTextWithEscapedHtmlChars, "</summary>\n<content type=\"xhtml\">").concat(xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace, "</content>\n</entry>\n    ");
        xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
        isEntry = xmlDom.documentElement.localName === "entry";
        t.true(isEntry);
        opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
        t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
        toMatch = xmlWithSomeEscapedHtmlCharsAtomDefaultNamespace
            .replace(/&quot;/g, "\"")
            .replace(/&#039;/g, "'");
        t.is(opds1Entry.Content.replace(/ xmlns="http:\/\/www\.w3\.org\/2005\/Atom"/, ""), toMatch);
        opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
        t.is(opds2Pub.Metadata.Description.replace(/ xmlns="http:\/\/www\.w3\.org\/1999\/xhtml"/, ""), toMatch);
        return [2];
    });
}); });
(0, ava_1.default)("OPDS1-2 description: summary", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var xmlSrc, xmlDom, isEntry, opds1Entry, toMatch, opds2Pub;
    return tslib_1.__generator(this, function (_a) {
        xmlSrc = "\n<entry\n    xmlns=\"http://www.w3.org/2005/Atom\"\n    xmlns:xhtm=\"http://www.w3.org/1999/xhtml\">\n<summary>".concat(plainTextWithEscapedHtmlChars, "</summary>\n</entry>\n    ");
        xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
        isEntry = xmlDom.documentElement.localName === "entry";
        t.true(isEntry);
        opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
        toMatch = (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars);
        t.is(opds1Entry.Summary, toMatch);
        opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
        t.is(opds2Pub.Metadata.Description, toMatch);
        return [2];
    });
}); });
(0, ava_1.default)("OPDS1-2 description: summary + content(HTML)", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var xmlSrc, xmlDom, isEntry, opds1Entry, toMatch, opds2Pub;
    return tslib_1.__generator(this, function (_a) {
        xmlSrc = "\n<entry\n    xmlns=\"http://www.w3.org/2005/Atom\"\n    xmlns:xhtm=\"http://www.w3.org/1999/xhtml\">\n<summary>".concat(plainTextWithEscapedHtmlChars, "</summary>\n<content type=\"html\">").concat(escapedHtmlWithSomeDoubleEscapedHtmlChars, "</content>\n</entry>\n    ");
        xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
        isEntry = xmlDom.documentElement.localName === "entry";
        t.true(isEntry);
        opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
        t.is(opds1Entry.Summary, (0, converter_1.unescapeHtmlEntities)(plainTextWithEscapedHtmlChars));
        toMatch = (0, converter_1.unescapeHtmlEntities)(escapedHtmlWithSomeDoubleEscapedHtmlChars);
        t.is(opds1Entry.Content, toMatch);
        opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
        t.is(opds2Pub.Metadata.Description, toMatch);
        return [2];
    });
}); });
function fn() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2, Promise.resolve("foo")];
        });
    });
}
(0, ava_1.default)("dummy async test", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
var MAX_TESTS = parseInt(process.env.MAX_TESTS || "0", 10) || 10;
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
                            ].forEach(function (term) {
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
                            ["role", "@context", "rel", "language", "conformsTo", "feature"].forEach(function (term) {
                                if (obj[term]) {
                                    var isArray = obj[term] instanceof Array;
                                    if (!isArray) {
                                        obj[term] = [obj[term]];
                                    }
                                }
                            });
                        };
                        (0, JsonUtils_1.traverseJsonObjects)(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeDate_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeName_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeArrays_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeBitrateAndTrack_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json1, function (obj) {
                            if (obj !== null) {
                                harmonizeNulls_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeDate_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeName_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeArrays_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeBitrateAndTrack_1(obj);
                            }
                        });
                        (0, JsonUtils_1.traverseJsonObjects)(json2, function (obj) {
                            if (obj !== null) {
                                harmonizeNulls_1(obj);
                            }
                        });
                        json1 = (0, JsonUtils_1.sortObject)(json1);
                        json2 = (0, JsonUtils_1.sortObject)(json2);
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
                    var authenticationUrls = new Set();
                    (0, JsonUtils_1.traverseJsonObjects)(json1, function (obj) {
                        if (obj === null) {
                            return;
                        }
                        var isFeed = obj.type === "application/opds+json";
                        var isPub = obj.type === "application/opds-publication+json";
                        var isWebPubManifestAudio = obj.type === "application/audiobook+json";
                        var isAuth = obj.type === "application/vnd.opds.authentication.v1.0+json";
                        var isWebPubManifest = obj.type === "application/webpub+json" && obj.href && obj.href.indexOf(".epub") < 0;
                        if (obj.href && (isFeed || isPub || isWebPubManifest || isWebPubManifestAudio || isAuth)) {
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
                                else if (isAuth) {
                                    authenticationUrls.add(uStr);
                                }
                            }
                            else {
                            }
                        }
                    });
                    var set = {
                        audiowebpubs: audiowebpubUrls,
                        authentications: authenticationUrls,
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
                    var proto = /^https:\/\//.test(url) ? https : http;
                    proto
                        .get(url, function (response) {
                        var str;
                        var buffs;
                        if (response.statusMessage) {
                            debug("".concat(url, " STATUS ==> ").concat(response.statusMessage));
                        }
                        if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                            debug("".concat(url, " ==> ").concat(response.statusCode, " (skipped)"));
                            var empty = {
                                audiowebpubs: new Set([]),
                                authentications: new Set([]),
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
                            var src, json1, isPublication, isAuth, opds2Feed, json2, res, err_1;
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
                                            reject("Problem loading: ".concat(url));
                                            return [2];
                                        }
                                        src = src.replace(/"published":\s*"-[^"]+"/g, '"published": "2022-01-01T00:00:00Z"');
                                        json1 = JSON.parse(src);
                                        isPublication = !json1.publications && !json1.navigation && !json1.groups && !json1.catalogs && json1.metadata;
                                        isAuth = !isPublication && json1.authentication;
                                        opds2Feed = isPublication
                                            ? (0, serializable_1.TaJsonDeserialize)(json1, opds2_publication_1.OPDSPublication)
                                            :
                                                isAuth
                                                    ? (0, serializable_1.TaJsonDeserialize)(json1, opds2_authentication_doc_1.OPDSAuthenticationDoc)
                                                    : (0, serializable_1.TaJsonDeserialize)(json1, opds2_1.OPDSFeed);
                                        json2 = (0, serializable_1.TaJsonSerialize)(opds2Feed);
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
                    })
                        .on("error", function (err) {
                        debug("".concat(url, " ERROR ==> ").concat(err));
                        var empty = {
                            audiowebpubs: new Set([]),
                            authentications: new Set([]),
                            feeds: new Set([]),
                            pubs: new Set([]),
                            webpubs: new Set([]),
                        };
                        resolve(empty);
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
                    var proto = /^https:\/\//.test(url) ? https : http;
                    proto
                        .get(url, function (response) {
                        var str;
                        var buffs;
                        if (response.statusMessage) {
                            debug("".concat(url, " STATUS ==> ").concat(response.statusMessage));
                        }
                        if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                            debug("".concat(url, " ==> ").concat(response.statusCode, " (skipped)"));
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
                                            reject("Problem loading: ".concat(url));
                                            return [2];
                                        }
                                        json1 = JSON.parse(src);
                                        try {
                                            pub = (0, serializable_1.TaJsonDeserialize)(json1, publication_1.Publication);
                                        }
                                        catch (err) {
                                            debug(err);
                                            reject(err);
                                            return [2];
                                        }
                                        json2 = (0, serializable_1.TaJsonSerialize)(pub);
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
                    })
                        .on("error", function (err) {
                        debug("".concat(url, " ERROR ==> ").concat(err));
                        resolve(true);
                    });
                })];
        });
    });
}
function recursePubs(t, urls, alreadyDone) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var urlsTodoWebPubs, _i, urlsTodoWebPubs_1, href, okay, err_3, urlsTodoAudioWebPubs, _a, urlsTodoAudioWebPubs_1, href, okay, err_4, urlsTodoPubs, _b, urlsTodoPubs_1, href, okay, urlsAuths, _c, urlsAuths_1, href, okay;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    urlsTodoWebPubs = [];
                    urls.webpubs.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsTodoWebPubs.push(u);
                        }
                    });
                    _i = 0, urlsTodoWebPubs_1 = urlsTodoWebPubs;
                    _d.label = 1;
                case 1:
                    if (!(_i < urlsTodoWebPubs_1.length)) return [3, 6];
                    href = urlsTodoWebPubs_1[_i];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4, webpubTest(href, alreadyDone)];
                case 3:
                    okay = _d.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    return [3, 5];
                case 4:
                    err_3 = _d.sent();
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
                    _d.label = 7;
                case 7:
                    if (!(_a < urlsTodoAudioWebPubs_1.length)) return [3, 12];
                    href = urlsTodoAudioWebPubs_1[_a];
                    _d.label = 8;
                case 8:
                    _d.trys.push([8, 10, , 11]);
                    return [4, webpubTest(href, alreadyDone)];
                case 9:
                    okay = _d.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    return [3, 11];
                case 10:
                    err_4 = _d.sent();
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
                    _d.label = 13;
                case 13:
                    if (!(_b < urlsTodoPubs_1.length)) return [3, 16];
                    href = urlsTodoPubs_1[_b];
                    return [4, testUrl(t, href, alreadyDone)];
                case 14:
                    okay = _d.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    _d.label = 15;
                case 15:
                    _b++;
                    return [3, 13];
                case 16:
                    urlsAuths = [];
                    urls.authentications.forEach(function (u) {
                        if (!alreadyDone.has(u)) {
                            urlsAuths.push(u);
                        }
                    });
                    _c = 0, urlsAuths_1 = urlsAuths;
                    _d.label = 17;
                case 17:
                    if (!(_c < urlsAuths_1.length)) return [3, 20];
                    href = urlsAuths_1[_c];
                    return [4, testUrl(t, href, alreadyDone)];
                case 18:
                    okay = _d.sent();
                    if (!okay) {
                        return [2, false];
                    }
                    _d.label = 19;
                case 19:
                    _c++;
                    return [3, 17];
                case 20: return [2, true];
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
                        var proto = /^https:\/\//.test(url) ? https : http;
                        proto
                            .get(url, function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var str, buffs;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                if (response.statusMessage) {
                                    debug("".concat(url, " STATUS ==> ").concat(response.statusMessage));
                                }
                                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                                    debug("".concat(url, " ==> ").concat(response.statusCode, " (skipped)"));
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
                                                    debug("Problem loading: ".concat(url, " (skip)"));
                                                    resolve(true);
                                                    return [2];
                                                }
                                                xmlDom = new xmldom.DOMParser().parseFromString((0, bom_1.removeUTF8BOM)(src), "application/xml");
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
                                                opds2Feed = (0, converter_1.convertOpds1ToOpds2)(opds1Feed);
                                                opds2FeedJson = (0, serializable_1.TaJsonSerialize)(opds2Feed);
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
                        }); })
                            .on("error", function (err) {
                            debug("".concat(url, " ERROR ==> ").concat(err));
                            resolve(true);
                        });
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
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (accessibility feed)", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://www.feedbooks.com/recent.json?accessibility=accessibility_fully";
                return [4, runUrlTest(t, url)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) 1", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) 2", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) CATALOGS", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://libraryregistry.librarysimplified.org/libraries";
                return [4, runUrlTest(t, url)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
(0, ava_1.default)("OPDS2 HTTP (de)serialize roundtrip (recursive) AUTHENTICATION", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "http://acl.simplye-ca.org/CALMDA/authentication_document";
                return [4, runUrlTest(t, url)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
(0, ava_1.default)("OPDS1-2 HTTP convert (de)serialize roundtrip (recursive)", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
(0, ava_1.default)("test", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url, done, _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                url = "https://api.archivelab.org/books/bookconcord_preface_1202/opds_audio_manifest";
                done = new Set([]);
                return [4, webpubTest(url, done)];
            case 1:
                _c.sent();
                debug(done);
                debug(done.size);
                _b = (_a = t).true;
                return [4, delay(true)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2];
        }
    });
}); });
(0, ava_1.default)("OPDS1-2 LCP passphrase convert (de)serialize roundtrip", function (t) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var xmlSrc, xmlDom, isEntry, opds1Entry, opds2Pub, opds2PubJson;
    return tslib_1.__generator(this, function (_a) {
        xmlSrc = "\n<entry\n    xmlns=\"http://www.w3.org/2005/Atom\"\n    xmlns:lcp=\"http://readium.org/lcp-specs/ns\">\n\n    <link\n        rel=\"http://opds-spec.org/acquisition/\"\n        href=\"FAKE_URL\"\n        type=\"application/vnd.readium.lcp.license.v1.0+json\">\n\n        <lcp:hashed_passphrase>FAKE_BASE64</lcp:hashed_passphrase>\n    </link>\n</entry>\n    ";
        xmlDom = new xmldom.DOMParser().parseFromString(xmlSrc, "application/xml");
        isEntry = xmlDom.documentElement.localName === "entry";
        t.true(isEntry);
        opds1Entry = xml_js_mapper_1.XML.deserialize(xmlDom, opds_entry_1.Entry);
        t.is(opds1Entry.Links[0].LcpHashedPassphrase, "FAKE_BASE64");
        opds2Pub = (0, converter_1.convertOpds1ToOpds2_EntryToPublication)(opds1Entry);
        t.is(opds2Pub.Links[0].Properties.AdditionalJSON.lcp_hashed_passphrase, "FAKE_BASE64");
        opds2PubJson = (0, serializable_1.TaJsonSerialize)(opds2Pub);
        t.is(opds2PubJson.links[0].properties.lcp_hashed_passphrase, "FAKE_BASE64");
        return [2];
    });
}); });
//# sourceMappingURL=test.js.map