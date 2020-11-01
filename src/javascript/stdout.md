# process.stdout, process.stdin

- stdout and stdin regulate communications between terminal and program.
- console.log is actually uses the process.stdout to print out messages.
- here is a complete example of program to ask a set of questions and record answers and print them back to the terminal.

```js
const questions = [
  "what's your name?",
  "what's your favorite language?",
  "where do you live?",
  "are you happy?",
];

const ask = (index = null) => {
  if (index === null) {
    index = Math.floor(Math.random() * Math.floor(questions.length)); // generate random index no greater than questions.length
  }

  process.stdout.write(`${questions[index]} \n`); // write a question to stdout
  process.stdout.write(">"); // prompting for answer
};

ask(0);

const answers = [];

process.stdin.on("data", (data) => {
  answers.push(data.toString().trim()); // adding answer to answers array

  if (answers.length < questions.length) {
    ask(answers.length);
  }

  if (answers.length === questions.length) {
    process.exit(0); // exit the process when we answered all questions, firing exit event
  }
});

process.on("exit", () => {
  // listening to exit event
  const [name, fav, live, happy] = answers;
  process.stdout.write(`
    Thank you ${name} For your answers
    you are living in ${live} and you like coding in ${fav}
    you are ${happy === "yes" ? "happy" : "NOT happy"}

    `);
});
```

<br />

## another Example: Async functions with timers, and progress bar

```js
const waitTime = 3000;
const intervalTime = 500;
let currentTime = 0;

const incTime = () => {
  currentTime += intervalTime;
  const p = Math.floor((currentTime / waitTime) * 100); // calculate done percentage
  process.stdout.clearLine(); // delete the previous line in the stdout
  process.stdout.cursorTo(0); // move the cursor to the beginning of the line
  process.stdout.write(`waiting .. ${p} %`);
};

console.log(`setting wait of ${waitTime / 1000} seconds`);

const timerFinished = () => {
  clearInterval(interval);
  process.stdout.clearLine(); // delete the waiting percentage log line
  process.stdout.cursorTo(0);
  console.log(`done`);
};

setTimeout(timerFinished, waitTime); // call timerFinished after waitTime milliseconds
const interval = setInterval(incTime, intervalTime); // returns an interval var we can use it when clearing
```
