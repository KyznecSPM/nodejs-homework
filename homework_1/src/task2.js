import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const INPUT_FILE_PATH = '../csv/file.csv';
const OUTPUT_FILE_PATH = '../output/file.txt';

const EXCLUDE_COLUMNS = ['Amount'];

const readStream = fs.createReadStream(
  path.resolve(__dirname, INPUT_FILE_PATH)
);

const writeStream = fs.createWriteStream(
  path.resolve(__dirname, OUTPUT_FILE_PATH)
);

readStream
  .pipe(
    csv().subscribe((csvLine) => {
      return new Promise((resolve) => {
        EXCLUDE_COLUMNS.map((columnName) => (csvLine[columnName] = undefined));
        resolve();
      });
    })
  )
  .pipe(writeStream)
  .on('error', (err) => console.error(err));
