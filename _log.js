"use strict";

const colors = require('colors');
function _ifDebug(fn, force) {
    force = force || false;
    if (global.debug || force) fn();
}

module.exports = {
    error: (msg) => {
        let error = msg;
        if(typeof msg.stack !== "undefined") error = msg.stack;
        console.log(("[x] " + error).bold.red);
        if (global.exitOnError) process.exit(1);
    },
    warn: (msg) => {
        console.log(("[!] " + msg).bold.yellow)
    },
    sequel: (msg) => {
        console.log(("[S] " + msg).magenta)
    },
    done: (msg) => {
        console.log(("[+] " + msg).bold.green)
    },
    resolved: (msg) => {
        console.log(("[R] " + msg).magenta)
    },
    task: (task, description) => {

        description = description || "";

        console.log(("[T] " + task).bold.green + (" | ") + (description).cyan)
    },
    data: (dataAsString, dataType) => {
        _ifDebug(() => {
            dataType = dataType || "";
            console.log("------ " + dataType + " ------");
            console.log(dataAsString);
            console.log("-------------");
        })
    },
    bundleFiles: (fileArray, outputFileName) => {
        _ifDebug(() => {
            console.log(("[>] " + outputFileName).bold.cyan);
            fileArray.forEach((item, index) => {
                console.log((" " + index + ": " + item).cyan)
            });
        })
    },
    /**
     *
     * @param startTime (new Date())
     */
    timePassed: (startTime) => {
        console.info(("------------------").bold.magenta);
        console.info(("[S] ~ %dms").bold.magenta, (new Date() - startTime));
    },
    start: (msg) => {
        console.log(("[#] " + msg).magenta.bold)
    },

    info: (msg) => {
        _ifDebug(() => {
            console.log(("[i] " + msg).cyan)
        });
    },
    infoHighlighted: (msg) => {
        _ifDebug(() => {
            console.log(("[i] " + msg).cyan.bold)
        });
    },
    infoForced: (msg) => {
        console.log(("[i] " + msg).cyan.bold)
    },

    infoObj: (objName, obj, force) => {
        _ifDebug(() => {
            console.log(("[i] " + objName).cyan)
            for (let key in obj) {
                console.log(("   " + key + " : " + obj[key]).cyan)
            }
        }, force);
    },
    infoArray: (Arr, heading, force) => {
        _ifDebug(() => {
            heading = heading || null;
            console.log(("-----------").cyan);
            if (heading) console.log(("[i] " + heading).cyan);
            Arr.forEach((item, index) => {
                console.log(("  " + index + " :: " + item).cyan)
            });
            console.log(("-----------").cyan);
        }, force);
    }
};
