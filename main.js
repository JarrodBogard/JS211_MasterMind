// 'use strict';

// const assert = require('assert');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

let board = [];
let solution = '';
let str = ""
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const input = document.querySelector("#entry")
const ol = document.querySelector("#ordered")
const hints = document.querySelector("#hints")

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
    if(element === solutionArray[i]) {
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
  const anotherLi = document.createElement("li")
  anotherLi.innerText = `Correct letters, correct position: ${hintOne}
   Correct letters, incorrect position: ${hintTwo}`
  hints.appendChild(anotherLi)
  return hintOne + "-" + hintTwo
}

const mastermind = (guess) => {
  guess = str
  const li = document.createElement("li")
  li.innerText = guess
  ol.appendChild(li)
  console.log(guess, "----mastermind----")
  if(guess.length != 4 || !guess.match(/^[a-h]+$/)) {
    return li.innerText = "Incorrect Entry: use 4 letters between a and h"
  } 
  if(guess === solution) {
    return li.innerText = "You guessed it!"
  } else {
    board.push(guess)
    generateHint(guess)
  }
}

const clearButton = () => {
  ol.innerHTML = ""
  hints.innerHTML = ""
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