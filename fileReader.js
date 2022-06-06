#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const currentDirectory = process.cwd();

const isFile = (fileName) => {
  return fs.lstatSync(fileName).isFile();
};

const list = fs.readdirSync(currentDirectory).filter(isFile);

inquirer
  .prompt([
    {
      name: "fileName",
      type: "list",
      message: "Choose file:",
      choices: list,
    },
  ])
  .then((answer) => {
    console.log(answer.fileName);
    const filePath = path.join(currentDirectory, answer.fileName);

    fs.readFile(filePath, "utf-8", (err, data) => {
      console.log(data);
    });
  });

///////////////////////////////////////////// Asking question to read specific file
// const yargs = require("yargs");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Please enter the path to the file ", (inputedPath) => {
//   const filePath = path.join(__dirname, inputedPath);

//   fs.readFile(filePath, "utf8", (err, data) => {
//     console.log(data);
//     rl.close();
//   });
// });

// rl.on("close", () => {
//   process.exit(0);
// });
//////////////////////////////////////////////
// const ip = ["89.123.1.41", "34.48.240.111"];

// const readStream = fs.createReadStream("./access.log", "utf8");

// const regs = [
//   new RegExp(`^${ip[0]}` + ".*$", "gm"),
//   new RegExp(`^${ip[1]}` + ".*$", "gm"),
// ];

// const outputs = [`./%${ip[0]}%_requests.log`, `./%${ip[1]}%_requests.log`];

// const { Transform } = require("stream");

// for (let i = 0; i < 2; i++) {
//   const transformStream = new Transform({
//     transform(chunk, encoding, callback) {
//       const transformedChunk = chunk.toString().match(regs[i]).join("\n");
//       callback(undefined, transformedChunk);
//     },
//   });

//   const writeStream = fs.createWriteStream(outputs[i], "utf-8");
//   readStream.pipe(transformStream).pipe(writeStream);
// }
