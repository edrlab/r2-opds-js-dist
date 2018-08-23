"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const path = require("path");
const arrify = require("arrify");
const babelConfigHelper = require("ava/lib/babel-config");
const CachingPrecompiler = require("ava/lib/caching-precompiler");
const globals = require("ava/lib/globals");
const Promise = require("bluebird");
const findCacheDir = require("find-cache-dir");
const meow = require("meow");
const pkgConf = require("pkg-conf");
const resolveCwd = require("resolve-cwd");
const uniqueTempDir = require("unique-temp-dir");
function resolveModules(modules) {
    return arrify(modules).map((name) => {
        const modulePath = resolveCwd(name);
        if (modulePath === null) {
            throw new Error(`Could not resolve required module '${name}'`);
        }
        return modulePath;
    });
}
globals.setTimeout = setTimeout.bind(null);
globals.clearTimeout = clearTimeout.bind(null);
Promise.longStackTraces();
const conf = pkgConf.sync("ava", {
    defaults: {
        babel: "default",
    },
});
const cli = meow(`
Usage
    $ iron-node node_modules/ava/profile.js <test-files>
Options
    --fail-fast   Stop after first test failure
    --serial, -s  Run tests serially
`, {
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
const files = cli.input.map((file) => {
    const f = path.resolve(file);
    console.log(f);
    return f;
});
const cacheDir = findCacheDir({
    files,
    name: "ava",
}) || uniqueTempDir();
babelConfigHelper.build(process.cwd(), cacheDir, conf.babel, true)
    .then((result) => {
    const precompiler = new CachingPrecompiler({
        babelCacheKeys: result.cacheKeys,
        getBabelOptions: result.getOptions,
        path: cacheDir,
    });
    const precompiled = {};
    files.forEach((file) => {
        precompiled[file] = precompiler.precompileFile(file);
    });
    const resolvedModules = resolveModules(conf.require);
    let uncaughtExceptionCount = 0;
    let currentIndex = 0;
    function runTest() {
        if (currentIndex >= files.length) {
            return;
        }
        const file = files[currentIndex];
        console.log(`============> ${file}`);
        const opts = {
            cacheDir,
            failFast: cli.flags.failFast,
            file,
            precompiled,
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
        setImmediate(() => {
            console.log("setImmediate ava/lib/test-worker REQUIRE EVAL");
            console.log(process.argv[2]);
            require("ava/lib/test-worker");
        });
    }
    const events = new EventEmitter();
    process.channel = {
        ref() {
        },
        unref() {
        },
    };
    process.send = (data) => {
        if (data && data.ava) {
            const name = data.name.replace(/^ava-/, "");
            if (events.listeners(name).length > 0) {
                events.emit(name, data.data);
            }
            else {
                console.log("UNHANDLED AVA EVENT:", name, data.data);
            }
            return;
        }
        console.log("NON AVA EVENT:", data);
    };
    events.on("test", (data) => {
        console.log("TEST:", data.title, data.error);
    });
    events.on("results", (data) => {
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
    events.on("stats", () => {
        setImmediate(() => {
            process.emit("ava-run", {});
        });
    });
    events.on("uncaughtException", (data) => {
        uncaughtExceptionCount++;
        let stack = data && data.exception && data.exception.stack;
        stack = stack || data;
        console.log(stack);
    });
    runTest();
});
//# sourceMappingURL=ava.js.map