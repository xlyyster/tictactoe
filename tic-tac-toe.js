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
        //console.log('here')
        if(board[position] === ' '){
            //console.log('here2')
            return true
        }
        else{
        console.log(`${position} is not empty. Try again!`)
        }
    }
    //console.log('exit valid')
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

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    const userInput = prompt(`Player ${currentTurnPlayer}, choose a position (1-9): `)
    return userInput
    //printBoard()
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --+---+-- \n' +
    ' 4 | 5 | 6 \n' +
    ' --+---+-- \n' +
    ' 7 | 8 | 9 \n');

//let winnerIdentified = false
//let currentTurnPlayer = 'X'
let keepPlaying = true
let winnerIdentified = false
let currentTurnPlayer = 'X'

while(keepPlaying){
    while (!winnerIdentified){
        let playerInput = playTurn(currentTurnPlayer) //prompt user for input
        if(validateMove(playerInput)){ // check for valid move
            board[playerInput] = currentTurnPlayer //store and update board data
            printBoard()

            if(checkWin(currentTurnPlayer)){
                console.log(`Player ${currentTurnPlayer} Wins!`) //player wins so end game
                winnerIdentified = true
            }
            else if(checkFull()){
                console.log(`The board is full! Its a tie!`) // both tie so end game
                winnerIdentified = true
            }
            else{
                currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X'; //change user to X or O
            }
        }
        //else {
        //    console.log(`Please enter a valid move (1-9). b`)
        //}
        // feel free to add logic here if needed, e.g. announcing winner or tie
    }
    let playerInput2 = prompt(`Restart Game? (Y/N): `)
    playerInput2 = playerInput2.toLowerCase()
    if(playerInput2 == 'n')
    {
        keepPlaying = false
        console.log('Quiting...')
    }
    else if(playerInput2 == 'y')
    {
        console.log('Game Restarting...')
        keepPlaying = true
        winnerIdentified = false
        currentTurnPlayer = 'X'
        board = {
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
        console.clear
        console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --+---+-- \n' +
        ' 4 | 5 | 6 \n' +
        ' --+---+-- \n' +
        ' 7 | 8 | 9 \n');
    }
    else{
        console.log('Please type Y/N only: ')
    }
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
