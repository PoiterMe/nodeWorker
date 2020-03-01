# nodeWorker
run task sync/async with predefined arguments on command line

add a runner script:

./test.js:
```js
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

```

and run 
`node test -test t1=1 t2=2`
