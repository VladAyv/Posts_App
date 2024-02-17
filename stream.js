const fs = require("fs");
const crypto = require("crypto");

const readFilePath = "./main.js";
const destinationPath = "./test.txt";
const descryptedFilePath = "./copyMain.js";

const encryptionAlgorithm = "aes-256-cbc";
const key = crypto.scryptSync("123", "salt", 32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(encryptionAlgorithm, key, iv);

const decipher = crypto.createDecipheriv(encryptionAlgorithm, key, iv);

const readableStream = fs.createReadStream(readFilePath, {
  encoding: "utf-8",
  highWaterMark: 10,
});

const readableStreamEncrypted = fs.createReadStream(destinationPath, {
  highWaterMark: 10,
});

const writeatbleStream = fs.createWriteStream(descryptedFilePath, {
  highWaterMark: 10,
});

readableStream.pipe(cipher).pipe(writeatbleStream);

readableStream.on("end", () => {
  readableStreamEncrypted.pipe(decipher).pipe(writeatbleStreamForDecrypt);
});
