const fs = require("fs");

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});

fs.readFile("./README.md", (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log("File read complited");
  process.nextTick(() => {
    console.log("Next Tcik inside read file");
  });
});

process.nextTick(() => {
  console.log("Next Tick");
});

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");
