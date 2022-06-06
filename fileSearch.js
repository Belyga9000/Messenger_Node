#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const { Transform } = require("stream");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let searchInput = "";

const getSearchInput = () => {
  rl.question("Please enter Search input: ", (answer) => {
    searchInput = answer;
    console.log(`your Search input is: ${searchInput}`);
    directoryPath();
  });
};
const directoryPath = () => {
  rl.question("Use current directory? yes or no :", (inputedPath) => {
    if (inputedPath === "yes") {
      let currentDirectory = process.cwd();
      fileSearch(currentDirectory);
    } else if (inputedPath === "no") {
      rl.question("Please enter directory name: ", (dirName) => {
        let currentDirectory = path.join(dirName);
        fileSearch(currentDirectory);
      });
    } else {
      console.log("incorect answer");
      directoryPath();
    }
  });
};

const fileSearch = (currentDirectory) => {
  const isFile = (fileName) => {
    return fs.lstatSync(fileName).isFile();
  };

  let list = fs.readdirSync(currentDirectory);

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
      const selectedPath = path.join(currentDirectory, answer.fileName);
      if (isFile(selectedPath)) {
        const regExp = new RegExp(searchInput, "g");
        // const regExp = new RegExp("^" + searchInput + ".*$", "gm"); dosen't work for some reason

        const readStream = fs.createReadStream(selectedPath, "utf-8");

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            console.log(chunk.toString().match(regExp));
            const checkIfAny = chunk.toString().match(regExp);
            if (checkIfAny) {
              const transformedChunk = checkIfAny.join("\n");
              callback(undefined, transformedChunk);
            }
          },
        });
        const writeStream = fs.createWriteStream(
          `${searchInput}_search.log`,
          "utf-8"
        );
        readStream.pipe(transformStream).pipe(writeStream);
      } else {
        return fileSearch((currentDirectory = selectedPath));
      }
    });
};

getSearchInput();
