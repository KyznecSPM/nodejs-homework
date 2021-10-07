import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const INPUT_FILE_PATH = '../../csv/file.csv';
const OUTPUT_FILE_PATH = '../../output/file.txt';

const OnError = (error) => console.error(error);

const clearFile = () => {
  try {
    fs.writeFile(
      path.resolve(__dirname, OUTPUT_FILE_PATH),
      '',
      'utf8',
      (error) => error && console.error(error)
    );
  } catch (error) {
    OnError(error);
  }
};

const task2 = () => {
  clearFile();
  csv()
    .fromStream(fs.createReadStream(path.resolve(__dirname, INPUT_FILE_PATH)))
    .subscribe((json) => {
      return new Promise((resolve) => {
        try {
          const lineWithoutAmount = JSON.stringify({
            ...json,
            Amount: undefined
          });
          fs.appendFile(
            path.resolve(__dirname, OUTPUT_FILE_PATH),
            `${lineWithoutAmount}\n`,
            'utf8',
            (error) => error && console.error(error)
          );
          resolve();
        } catch (error) {
          OnError(error);
        }
      });
    }, OnError);
};

task2();
