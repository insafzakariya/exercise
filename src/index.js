const { getRandomWordSync, getRandomWord } = require("word-maker");
var fs = require("fs");

console.log("It works!");

// YOUR CODE HERE

//Create Output file in root directory
var log_file = fs.createWriteStream("./output.log", { flags: "w" });

//FizzBuzz checking Function Related to Task 2
const fizzBuzzChecker = (number) => {
  return number % 3 === 0 && number % 5 === 0
    ? "FizzBuzz"
    : number % 5 === 0
    ? "Buzz"
    : number % 3 === 0
    ? "Fizz"
    : number;
};

//FizzBuzz checking Function With Promises.Related to Task 3
const fizzBuzzCheckerPromises = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const result =
        number % 3 === 0 && number % 5 === 0
          ? "FizzBuzz"
          : number % 5 === 0
          ? "Buzz"
          : number % 3 === 0
          ? "Fizz"
          : number;

      resolve(result);
    }, 500);
  });
};

// Task 1
const task_1 = () => {
  for (let i = 0; i < 100; i++) {
    // console.log(i + 1 + ":" + getRandomWordSync());
    log_file.write(i + 1 + ":" + getRandomWordSync() + "\r\n");
  }
};

// Task 2
const task_2 = () => {
  for (let i = 0; i < 100; i++) {
    const fizzBizz = fizzBuzzChecker(i + 1);
    let randomWord = "";
    try {
      randomWord = getRandomWordSync({ withErrors: true });
    } catch (e) {
      randomWord = "It shouldn't break anything!";
    }

    // console.log(fizzBizz + ":" + randomWord);
    log_file.write(fizzBizz + ":" + randomWord + "\r\n");
  }
};

//Task 3 - asynchronous Function
const task_3 = async () => {
  for (let i = 0; i < 100; i++) {
    const fizzBizz = await fizzBuzzCheckerPromises(i + 1);
    const randomWord = await getRandomWord({ withErrors: true })
      .then((data) => {
        return data;
      })
      .catch((e) => "It shouldn't break anything!");

    // console.log(fizzBizz + ":" + randomWord);
    log_file.write(fizzBizz + ":" + randomWord + "\r\n");
  }
};

// call Task by Task Here
// task_1()
// task_2()
task_3()
