const fs = require("fs");

const pathToFile = "./test.txt";

const readableStream = fs.createReadStream(pathToFile);

const content = "Hello ";

fs.writeFileSync(pathToFile, content);

let fileContent = fs.readFileSync(pathToFile, "utf8");
console.log("fileContent", fileContent);

fs.appendFileSync(pathToFile, " World");

fileContent = fs.readFileSync(pathToFile, "utf8");
console.log("fileContent", fileContent);

fs.open(pathToFile, "w+", (err, fd) => {
  if (err) {
    console.error(err.message);
  }

  fs.write(fd, "Hello From Open!", (err, written, str) => {
    if (err) {
      console.error(err);
    }
    console.log("written", written);
    console.log("str", str);

    const buffer = Buffer.alloc("Hello From Open!".length);

    fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, data) => {
      if (err) {
        console.error(err);
      }
      console.log("bytes read", bytesRead);
      console.log("buffer", data.toString());

      fs.close(fd, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});
