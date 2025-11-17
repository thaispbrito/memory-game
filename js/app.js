// PSEUDOCODE (Initial Project Planning) - Concentration (Memory Game)

//1. First, define the variables that are required for tracking the state of the game, 
// such as a variable that tracks the number of tries and another one that tracks the numbers of pairs, among others.

//2. Think about how you want to define the number of pairs. It could be predefined by the game, set by the user or 
// incremented by different levels of the game.

//3. Make sure to store the cached element references.

//4. The state of the game should be initialized when the page loads.

//5. A function should be called to render the state of the game, and that state should be rendered to the user.

//6. Define any required constants for the game.

//7. Create all the necessary functions, including one to handle a player clicking a pair element (e.g., card).
// This `handleClick` function should call other functions defined in the global scope.

//8. Create a reset functionality, so that the game could restart once triggered by a click from the user.

//9. Add event listeners to handle user interactions, at least for the pair elements and for the reset button.

//10. Define how the player loses the game. It could be after a certain amount of time or a certain number of wrong guesses.

//11. Define a theme for your game, such as Nature/hiking related. The pairs could be represented by cards, symbols, emojis, pictures, etc.


/*-------------------------------- Constants --------------------------------*/
const pairs = ['🐵', '🐵', '🐶', '🐶', '🐯', '🐯', '🦊', '🦊', '🐰', '🐰', '🐻', '🐻'];

/*---------------------------- Variables (state) ----------------------------*/
let board;  // For tracking the state of the game
let turn;  // For tracking the turns
let numTries;  // For tracking the number of tries
let numPairs  // For tracking the number of matched pairs
let winner;  // For checking if the player wins

/*------------------------ Cached Element References ------------------------*/
const emojiEls = document.querySelectorAll('.emoji');
const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
function init() {

    board = ['', '', '', '', '', '', '', '', '', ''];  // The emojis will be all hidden from start
    shuffleGame();
    turn = false;
    numTries = 0;
    numPairs = 0;
    winner = false;
    render();
};

init();

// Create a function to shuffle the game
function shuffleGame() {
    for (let i = 0; i < pairs.length; i++) {
        const randomIdx = Math.floor(Math.random() * pairs.length);

    // In order to shuffle the game, use a temp variable to swap the emojis
    let tempVar = pairs[i];
    pairs[i] = pairs[randomIdx];
    pairs[randomIdx] = tempVar;    
    }    
};

// Create a function to render the updated board state and message
function render () {
    updateBoard();
    updateMessage();
};

// Create a function to update the board
function updateBoard() {

    // Continue

};

// Create a function to update the message based on the progress of the game
function updateMessage() {

    // Continue

};

// Create a function to handle the clicks
function handleClick(event) {
    // Check if the clicked element is an emoji, exit otherwise
    if (!event.target.classList.contains('emoji')) {
        return;
    }

    // Continue

    placeEl();

    checkForWinner();

    trackTurns();

    render();
};

// Create a function to check if the player wins or not
function checkForWinner() {

    // Continue
};

// Create a function to track turns
function trackTurns() {
    if(winner) {
        // If the player wins, return out of the function
        return;
    } else {

        // Continue
    }
};


/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);