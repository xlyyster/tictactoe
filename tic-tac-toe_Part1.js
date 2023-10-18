/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');
const { clear } = require('console');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
        board[position] = mark
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.clear(); // Clear the console for a clean display
    console.log(` ${board[1]} | ${board[2]} | ${board[3]}`);
    console.log('---+---+---');
    console.log(` ${board[4]} | ${board[5]} | ${board[6]}`);
    console.log('---+---+---');
    console.log(` ${board[7]} | ${board[8]} | ${board[9]}`);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    if (position >= 1 && position <= 9) { // checking for valid inputs 1-9 and check whether it is empty or not
        if(board[position] === ' '){
            return true
        }
        else{
        console.log(`${position} is not empty. Try again!`)
        }
    }
    console.log(`Please enter a valid move (1-9).`)
    return false
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6], 
    [7, 8, 9], // Rows
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 6, 9], // Columns
    [1, 5, 9], 
    [3, 5, 7], // Diagonal
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    if(player === 'X'){ //check for player X
        for (const combo of winCombinations) { //check through the array with the winCombinations
            const [a, b, c] = combo;
            if (board[a] === 'X' && board[b] === 'X' && board[c] === 'X') { //if there is an X in the combination for all 3 location
            return true; // return win
            }
        }
    }
    else if(player === 'O'){ //check for player O
        for (const combo of winCombinations) { 
            const [a, b, c] = combo;
            if (board[a] === 'O' && board[b] === 'O' && board[c] === 'O') { //if there is an O in the combination for all 3 location
                return true; //return win
            }
        }
    }
    return false; // else nobody win yet, no combo hit
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    //console.log("checkingfull") //debug code
    for(let i = 1; i <= 9; i++){ //loop through all array board
        //console.log("enter loop: "+ i) //debug code
        if(board[i] == ' '){ //if board[i] has an empty return false and continue
            //console.log(i+'empty') //debug code
            return false
        }
    }
    return true //else passed the checking and return true for all slot are not empty
}



// Main Program, a Tester for your functions
// It does not cover the printBoard() function.

// If you pass all the tests, you should see a message 'All tests passed! Congratulations!'
// without any error

// Do Not modify the lines below!

// Test validateMove()
assert.strictEqual(validateMove(0), false, "validateMove() didn't work as expected with input : 0");
assert.strictEqual(validateMove(10), false, "validateMove() didn't work as expected with input : 10");
assert.strictEqual(validateMove('Hello'), false, "validateMove() didn't work as expected with input : 'Hello'");
assert.strictEqual(validateMove('1'), true, "validateMove() didn't work as expected with input : 1");
assert.strictEqual(validateMove('5'), true, "validateMove() didn't work as expected with input : 5");
assert.strictEqual(validateMove('9'), true, "validateMove() didn't work as expected with input : 9");

let tsetBoard = {
    1: 'X', 2: 'O', 3: 'X',
    4: 'O', 5: 'X', 6: 'O',
    7: ' ', 8: ' ', 9: ' '
};

// Test markBoard()
markBoard(1, 'X');
markBoard(2, 'O');
markBoard(3, 'X');
markBoard(4, 'O');
markBoard(5, 'X');
markBoard(6, 'O');

assert.deepStrictEqual(board, tsetBoard, "markBoard() didn't work as expected");

assert.strictEqual(validateMove('1'), false, "validateMove() didn't work as expected with duplicated input : 1");

// Test checkWin()
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");
tsetBoard[7] = 'X'
markBoard(7, 'X');
assert.deepStrictEqual(board, tsetBoard, "markBoard() didn't work as expected with input (7, 'X')");
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");


board = {
    1: 'X', 2: ' ', 3: ' ',
    4: 'O', 5: 'X', 6: ' ',
    7: 'O', 8: ' ', 9: 'X'
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'O', 2: ' ', 3: ' ',
    4: 'X', 5: 'O', 6: ' ',
    7: 'X', 8: 'X', 9: 'O'
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");

board = {
    1: 'X', 2: 'O', 3: 'O',
    4: 'X', 5: ' ', 6: ' ',
    7: 'X', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'X', 2: 'O', 3: 'X',
    4: 'X', 5: 'O', 6: ' ',
    7: ' ', 8: 'O', 9: ' '
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");

board = {
    1: 'X', 2: 'X', 3: 'X',
    4: 'O', 5: 'O', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('X'), true, "checkWin() didn't work as expected with input : 'X'");
assert.strictEqual(checkWin('O'), false, "checkWin() didn't work as expected with input : 'O'");

board = {
    1: 'X', 2: 'X', 3: ' ',
    4: 'O', 5: 'O', 6: 'O',
    7: 'X', 8: ' ', 9: ' '
}
assert.strictEqual(checkWin('O'), true, "checkWin() didn't work as expected with input : 'O'");
assert.strictEqual(checkWin('X'), false, "checkWin() didn't work as expected with input : 'X'");


// Test checkFull()
assert.strictEqual(checkFull(), false, "checkFull() didn't work as expected");
board = {
    1: 'O', 2: 'X', 3: 'O',
    4: 'O', 5: 'X', 6: 'X',
    7: 'X', 8: 'O', 9: 'X'
}
assert.strictEqual(checkFull(), true, "checkFull() didn't work as expected");

console.log("All tests passed! Congratulations!");