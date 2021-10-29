import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const INPUT_FILE_PATH = '../../csv/file.csv';
const OUTPUT_FILE_PATH = '../../output/file.txt';

const EXCLUDE_COLUMNS = ['Amount'];

const readFileStream = fs.createReadStream(
  path.resolve(__dirname, INPUT_FILE_PATH)
);

const onError = (error) => console.error(error);

const clearFile = () => {
  try {
    fs.writeFile(
      path.resolve(__dirname, OUTPUT_FILE_PATH),
      '',
      'utf8',
      (error) => error && console.error(error)
    );
  } catch (error) {
    onError(error);
  }
};

const getFilteredObject = (object, keys) =>
  Object.entries(object).reduce((acc, [key, value]) => {
    if (keys.includes(key)) return acc;
    return { ...acc, [key]: value };
  }, {});

const saveFilteredJson = async (object, keys) => {
  try {
    const filteredString = JSON.stringify(getFilteredObject(object, keys));
    await fs.appendFile(
      path.resolve(__dirname, OUTPUT_FILE_PATH),
      `${filteredString}\n`,
      'utf8',
      (error) => error && console.error(error)
    );
  } catch (error) {
    onError(error);
  }
};

const task2 = () => {
  clearFile();
  csv()
    .fromStream(readFileStream)
    .subscribe((object) => {
      return saveFilteredJson(object, EXCLUDE_COLUMNS);
    }, onError);
};

task2();
