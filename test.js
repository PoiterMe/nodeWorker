const nodeWorker = require("./index");

global.debug = true;

nodeWorker.flags({
    "-test": {
        availFlags: ["test1", "test2"],
        description: "test",
        fn: function (flags) {
            nodeWorker.seq([
                [
                    async function () {
                        console.log(flags)
                    },
                    {
                        task: "test"
                    }
                ],
                [
                    async function () {
                        console.log("Sequel 2 Task 1")
                    },
                    async function () {
                        console.log("Sequel 2 Task 2")
                    },
                    async function () {
                        console.log("Sequel 2 Task 3")
                    },
                ]
            ], flags);
        }
    }
}, [
    {
        var: "test1",
        flag: ["t1=", "test1="],
        fn: function (flag) {
            return flag;
        },
        description: "test flag 1"
    },
    {
        var: "test2",
        flag: ["t2=", "test2="],
        fn: function (flag) {
            return flag;
        },
        description: "test flag 2"
    }
])
