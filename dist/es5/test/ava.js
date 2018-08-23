"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = require("events");
var path = require("path");
var arrify = require("arrify");
var babelConfigHelper = require("ava/lib/babel-config");
var CachingPrecompiler = require("ava/lib/caching-precompiler");
var globals = require("ava/lib/globals");
var Promise = require("bluebird");
var findCacheDir = require("find-cache-dir");
var meow = require("meow");
var pkgConf = require("pkg-conf");
var resolveCwd = require("resolve-cwd");
var uniqueTempDir = require("unique-temp-dir");
function resolveModules(modules) {
    return arrify(modules).map(function (name) {
        var modulePath = resolveCwd(name);
        if (modulePath === null) {
            throw new Error("Could not resolve required module '" + name + "'");
        }
        return modulePath;
    });
}
globals.setTimeout = setTimeout.bind(null);
globals.clearTimeout = clearTimeout.bind(null);
Promise.longStackTraces();
var conf = pkgConf.sync("ava", {
    defaults: {
        babel: "default",
    },
});
var cli = meow("\nUsage\n    $ iron-node node_modules/ava/profile.js <test-files>\nOptions\n    --fail-fast   Stop after first test failure\n    --serial, -s  Run tests serially\n", {
    alias: {
        s: "serial",
    },
    boolean: [
        "fail-fast",
        "verbose",
        "serial",
        "tap",
    ],
    default: conf,
    string: [
        "_",
    ],
});
if (cli.input.length <= 0) {
    throw new Error("Specify test files");
}
var files = cli.input.map(function (file) {
    var f = path.resolve(file);
    console.log(f);
    return f;
});
var cacheDir = findCacheDir({
    files: files,
    name: "ava",
}) || uniqueTempDir();
babelConfigHelper.build(process.cwd(), cacheDir, conf.babel, true)
    .then(function (result) {
    var precompiler = new CachingPrecompiler({
        babelCacheKeys: result.cacheKeys,
        getBabelOptions: result.getOptions,
        path: cacheDir,
    });
    var precompiled = {};
    files.forEach(function (file) {
        precompiled[file] = precompiler.precompileFile(file);
    });
    var resolvedModules = resolveModules(conf.require);
    var uncaughtExceptionCount = 0;
    var currentIndex = 0;
    function runTest() {
        if (currentIndex >= files.length) {
            return;
        }
        var file = files[currentIndex];
        console.log("============> " + file);
        var opts = {
            cacheDir: cacheDir,
            failFast: cli.flags.failFast,
            file: file,
            precompiled: precompiled,
            require: resolvedModules,
            serial: cli.flags.serial,
            tty: false,
        };
        uncaughtExceptionCount = 0;
        process.argv[2] = JSON.stringify(opts);
        process.argv.length = 3;
        if (console.profile) {
            console.profile("AVA test-worker process");
        }
        setImmediate(function () {
            console.log("setImmediate ava/lib/test-worker REQUIRE EVAL");
            console.log(process.argv[2]);
            require("ava/lib/test-worker");
        });
    }
    var events = new EventEmitter();
    process.channel = {
        ref: function () {
        },
        unref: function () {
        },
    };
    process.send = function (data) {
        if (data && data.ava) {
            var name_1 = data.name.replace(/^ava-/, "");
            if (events.listeners(name_1).length > 0) {
                events.emit(name_1, data.data);
            }
            else {
                console.log("UNHANDLED AVA EVENT:", name_1, data.data);
            }
            return;
        }
        console.log("NON AVA EVENT:", data);
    };
    events.on("test", function (data) {
        console.log("TEST:", data.title, data.error);
    });
    events.on("results", function (data) {
        console.log("RESULTS:", data.stats);
        currentIndex++;
        if (currentIndex < files.length) {
            runTest();
        }
        else {
            console.log("ALL TESTS DONE.");
            if (console.profileEnd) {
                console.profileEnd();
            }
            if (process.exit) {
                console.log("EXIT ...");
                process.exit(data.stats.failCount + uncaughtExceptionCount);
            }
        }
    });
    events.on("stats", function () {
        setImmediate(function () {
            process.emit("ava-run", {});
        });
    });
    events.on("uncaughtException", function (data) {
        uncaughtExceptionCount++;
        var stack = data && data.exception && data.exception.stack;
        stack = stack || data;
        console.log(stack);
    });
    runTest();
});
//# sourceMappingURL=ava.js.map