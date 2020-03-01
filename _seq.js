"use strict";

const _log = require("./_log"),
	_req = require("./_req");

function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

module.exports = function (instruct, flags) {
	_log.info("flag obj :: " + JSON.stringify(flags));
	_req().then((taskReq) => {
		(async function () {
			let overallTime = new Date();
			for (let i = 0; i < instruct.length; i++) {
				let tasksForSeq = [];
				for (let d = 0; d < instruct[i].length; d++) {
					let taskInstruction = instruct[i][d];
					if (typeof taskInstruction.task !== "undefined") {
						tasksForSeq.push({
							task: taskInstruction.task,
							args: taskInstruction.args || null
						});
					} else if (isFunction(taskInstruction)) tasksForSeq.push(taskInstruction);
				}
				try {
					let debugMsg = "";
					tasksForSeq.forEach((task) => {
						if (typeof task.task !== "undefined") debugMsg += task.task + "(" + (task.args || '') + ") "
						else {
							debugMsg += "[async Function] "
						}
					});
					_log.sequel(debugMsg);
					await Promise.all(tasksForSeq.map((item) => {
						if (typeof item.task !== "undefined") {
							item.args = item.args || [];
							let flagsArr = [flags];
							return taskReq(item.task).apply(item.task, flagsArr.concat(item.args));
						} else {
							_log.start("[async Function]");
							return item();
						}
					}));
				} catch (e) {
					_log.error(e);
				}
			}
			_log.timePassed(overallTime);
		})();
	}).catch(e => {
		_log.error(e);
	})
};




