const fs = require("fs");

const readStream = fs.createReadStream("./access.log", "utf8");

const regs = [
  new RegExp("^89.123.1.41.*$", "gm"),
  new RegExp("^34.48.240.111.*$", "gm"),
];

const outputs = [
  "./%89.123.1.41%_requests.log",
  "./%34.48.240.111%_requests.log",
];

const { Transform } = require("stream");

for (let i = 0; i < 2; i++) {
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const transformedChunk = chunk.toString().match(regs[i]).join("\n");
      callback(undefined, transformedChunk);
    },
  });

  const writeStream = fs.createWriteStream(outputs[i], "utf-8");
  readStream.pipe(transformStream).pipe(writeStream);
}
