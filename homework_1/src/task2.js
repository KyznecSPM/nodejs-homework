import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const INPUT_FILE_PATH = '../csv/file.csv';
const OUTPUT_FILE_PATH = '../output/file.txt';

const EXCLUDE_COLUMNS = ['Amount'];

const errorLogger = (err) => console.error(err);

const readStream = fs
  .createReadStream(path.resolve(__dirname, INPUT_FILE_PATH))
  .on('error', errorLogger);

const writeStream = fs
  .createWriteStream(path.resolve(__dirname, OUTPUT_FILE_PATH))
  .on('error', errorLogger);

const filterCsv = csv()
  .subscribe((csvLine) => {
    return new Promise((resolve) => {
      EXCLUDE_COLUMNS.map((columnName) => (csvLine[columnName] = undefined));
      resolve();
    });
  })
  .on('error', errorLogger);

readStream.pipe(filterCsv).pipe(writeStream);
