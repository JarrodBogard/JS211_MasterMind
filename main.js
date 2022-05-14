// 'use strict';

// const assert = require('assert');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

let board = [];
let solution = 'abcd';
let str = ""
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const input = document.querySelector("#entry")
const ol = document.querySelector("#ordered")

input.addEventListener("keyup", e => {
  str = e.target.value
  console.log(str)
})

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
  console.log(solution, "----solution----")
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  guess = str
  console.log(guess, "----generateHint----")
  let solutionArray = solution.split("")
  let guessArray = guess.split("")
  let hintOne = 0
  let hintTwo = 0
  guessArray.forEach((element, i) => {
    if(guessArray[i] === solutionArray[i]) {
      hintOne++
      guessArray[i] = 0
      solutionArray[i] = 1
      console.log(guessArray[i], "----matches----", solutionArray[i], "-----matches-----")
    }
  })
  guessArray.forEach((element, i) => {
    solutionArray.forEach((solutionLetter, index) => {
      if(element === solutionLetter) {
        hintTwo++
        guessArray[i] = 0
        solutionArray[index] = 0
      }
    })
  })
  console.log(hintOne, "-", hintTwo)
  return hintOne + "-" + hintTwo
}

const mastermind = (guess) => {
  guess = str
  console.log(guess, "----mastermind----")
  const li = document.createElement("li")
  li.innerText = guess
  ol.appendChild(li)
  // if(guess.length === 4 && guess.some() == letters.some()) {}
  if(guess === solution) {
    // console.log("Winner")
    return li.innerText = "You guessed it!"
  } else {
    board.push(guess)
    // printBoard()
    // console.log(board, "----board----")
    generateHint(guess)
  }
}

const clearButton = () => {
  ol.innerHTML = ""
  input.value = ""
  str = ""
}

// const getPrompt = () =>  {
//   console.log(board, "---board---")
//   rl.question('guess: ', (guess) => {
//     mastermind(guess);
//     printBoard();
//     getPrompt();
//   });
// }

// Tests

// if (typeof describe === 'function') {
//   solution = 'abcd';
//   describe('#mastermind()', () => {
//     it('should register a guess and generate hints', () => {
//       mastermind('aabb');
//       assert.equal(board.length, 1);
//     });
//     it('should be able to detect a win', () => {
//       assert.equal(mastermind(solution), 'You guessed it!');
//     });
//   });

//   describe('#generateHint()', () => {
//     it('should generate hints', () => {
//       assert.equal(generateHint('abdc'), '2-2');
//     });
//     it('should generate hints if solution has duplicates', () => {
//       assert.equal(generateHint('aabb'), '1-1');
//     });

//   });

// } else {

//   generateSolution();
//   getPrompt();
// }