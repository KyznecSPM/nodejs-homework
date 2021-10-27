import process from 'process';

const task1 = () => {
  process.stdin.on('data', (data) => {
    console.log(data.toString().split('').reverse().join(''));
  });
};

task1();
