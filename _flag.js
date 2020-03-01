"use strict";
const _log = require("./_log");

let ADDITIONAL_FLAGS = null;
function additionalFlagResolve(glFlags, flagsA, availFlags) {
    let ragObj = {};
    if (typeof availFlags !== "undefined") {
        for (let x in glFlags) {
            if(glFlags.hasOwnProperty(x)){
                let flag = glFlags[x];
                for (let j in flagsA) {
                    if(flagsA.hasOwnProperty(j)){
                        let flagName = flagsA[j].var,
                            flags = flagsA[j].flag,
                            flagFn = flagsA[j].fn,
                            flagDescription = flagsA[j].description || "";
                        for (let k in flags) {
                            if(flags.hasOwnProperty(k)){
                                let ap = flags[k],
                                    apLength = ap.length,
                                    flagR = flag.substr(0, apLength);
                                if (ap === flagR && availFlags.indexOf(flagName) >= 0) {
                                    let slice = flag.slice(apLength) || true;
                                    _log.infoForced("flag : '"+ flagR +"' {" + flagName + ' : ' + slice + "} ->  " + flagDescription);
                                    ragObj[flagName] = flagFn(slice) || null;
                                } else if (ap === flagR && availFlags.indexOf(flagName) === -1) {
                                    _log.error(flagR + " is not allowed for this Task, u can use one of the following flags :: " + availFlags);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return ragObj;
}
function helping(flags) {
    _log.start('Lists all available Tasks ::');
    for (let k in flags) {
        if(flags.hasOwnProperty(k)){
            _log.task(k, flags[k].description);
        }
    }
    _log.start('Lists all additional flags ::');
    for (let k in ADDITIONAL_FLAGS) {
        if(ADDITIONAL_FLAGS.hasOwnProperty(k)){
            _log.task(ADDITIONAL_FLAGS[k].flag, ADDITIONAL_FLAGS[k].description);
        }
    }
}
function _flag(flags) {
    global.executionTime = new Date();
    let glFlags = process.argv;
    if (glFlags.indexOf('-list') !== -1 || glFlags.indexOf('-help') !== -1 || glFlags.length === 2) {
        helping(flags);
        process.exit();
    } else {
        for (let i = 2; i < glFlags.length; i++) {
            let key = glFlags[i];
            if (key[0] === "-") {
                let additionalParameter = null;
                if (typeof flags[key] !== "undefined") {
                    _log.start(key + ' :: ' + flags[key].description);
                    additionalParameter = additionalFlagResolve(glFlags, ADDITIONAL_FLAGS, flags[key].availFlags) || false;
                    flags[key].fn.call(flags[key], additionalParameter);
                } else {
                    _log.error('!!! "' + key + '" is not defined, use one of the following : !!!');
                    helping(flags);
                }
            }
        }
    }
}
module.exports = function (flags, additionalFlags) {
    ADDITIONAL_FLAGS = additionalFlags || [];
    _flag(flags);
};