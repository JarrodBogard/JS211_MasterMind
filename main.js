'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


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

  // solution = 'abcd'; // Comment this out to generate a random solution
  if(guess === solution) {
    // console.log("Winner")
    return "You guessed it!"
  } else {
    board.push(guess)
    generateHint(guess)
  }
}


const getPrompt = () =>  {
  console.log(board, "---board---")
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}