// Importing the 'fs' module for file system operations
const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 * Writes data to the JSON file specified by the destination path.
 * @param {string} destination - The path of the file to write to.
 * @param {object} content - The data to write to the file.
 * @returns {void}
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 * Reads data from a file, appends new content, and writes it back to the file.
 * @param {object} content - The content to append to the file.
 * @param {string} file - The path to the file.
 * @returns {void}
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend }; // Exporting the functions for use in other files
