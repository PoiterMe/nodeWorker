const
    path = require("path"),
    fg = require("fast-glob"),
    _log = require("./_log");

const task_dir = path.normalize(__dirname + "/_tasks");

module.exports = async function () {
    try {
        let tasks = await fg(task_dir + "/**/index.js"),
            retObj = {};

        tasks.forEach((elem) => {
            let moduleName = path.basename(path.dirname(elem))
            retObj[moduleName] = elem;
        });
        return (key) => {
            if (key in retObj) {
                _log.start(key);
                return require(retObj[key])
            } else {
                return async function () { }
            }
        };
    } catch (e) {
        _log.error(e);
    }
};







