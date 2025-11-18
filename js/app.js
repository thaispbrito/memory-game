// PSEUDOCODE (Project Planning) - Concentration (Memory Game)

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
const pairs = ['🌋', '🌋', '🏞️', '🏞️', '⛰️', '⛰️', '🥾', '🥾', '🍂', '🍂', '🐻', '🐻'];

/*---------------------------- Variables (state) ----------------------------*/
let boardItems;  
let numTries;  
let numPairs;
let matchPair;  
let winner;
let gameOver;  
let playerChoice1;
let playerChoice2;
let prevPlayerChoice1;
let prevPlayerChoice2;

/*------------------------ Cached Element References ------------------------*/
const emojiElements = document.querySelectorAll('.emoji');
const messageElement = document.querySelector('#message');
const boardElement = document.querySelector('.board');
const resetBtnElement = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
function init() {

    boardItems = ['', '', '', '', '', '', '', '', '', '', '', ''];  // The emojis will be all hidden from start
    shuffleGame();
    numTries = 0;
    numPairs = 0;
    matchPair = false;
    winner = false;
    gameOver = false;
    playerChoice1 = null;
    playerChoice2 = null;
    prevPlayerChoice1 = null;
    prevPlayerChoice2 = null;
    render();
};

// Call the init() function to initialize the game and render the initial state
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
    boardItems.forEach((boardElement, idx) => {
        emojiElements[idx].textContent = boardElement;
    })
};

// Create a function to update the message based on the progress of the game
function updateMessage() {

    if(!winner && !gameOver && matchPair) {   
        // Update the message with the new number of pairs
        messageElement.textContent = `Tries: ${numTries} | Pairs:${numPairs}`
    } else if(!winner && !gameOver && !matchPair) {
        // Update the message with the new number of tries
        messageElement.textContent = `Tries: ${numTries} | Pairs:${numPairs}`
    } else if(winner) {
        // Update the message congratulating the player for winning the game
        messageElement.textContent = `Congratulations! You just won the game!`
    } else {
        // Update the message letting the player know that the game is over
        messageElement.textContent = `Gave Over!`
    }
};

// Create a function to handle the clicks
function handleClick(event) {

    // Exit the function if game is over
    if(numTries === 10) {
        return;
    }

    // Check if the clicked element is an emoji, exit otherwise
    if (!event.target.classList.contains('emoji')) {
        return;
    }
    
    // Set the emoji index
    const emojiIdx = parseInt(event.target.id);

    // Make sure the player is not able to click the same emoji twice for the same turn
    if (emojiIdx === playerChoice1 || emojiIdx === playerChoice2) {
        return;
    }

    // Deal with previous mismatch, if that's the case
    if (prevPlayerChoice1 !== null && prevPlayerChoice2 !== null) {
        boardItems[prevPlayerChoice1] = '';
        boardItems[prevPlayerChoice2] = '';
        prevPlayerChoice1 = null;
        prevPlayerChoice2 = null;
    }

    // Deal with the current choice
    if (playerChoice1 === null) {
        playerChoice1 = emojiIdx;
    } else if (playerChoice2 === null) {
        playerChoice2 = emojiIdx;
    }
 
    // Reveal the clicked emoji
    showElement(emojiIdx);

    // Check the state of the game
    if (playerChoice1 !== null && playerChoice2 !== null) {
        checkGameState(); 
    }

    render();
};


// Create a function to show the element 
function showElement(idx) {
    
    boardItems[idx] = pairs[idx]; 
    
};

// Create a function to check the choices, and if the player wins or not
function checkGameState() {
    
    // Check if there is a match, if so do not hide matched emojis
    if (pairs[playerChoice1] === pairs[playerChoice2]) {
        
        // There is a match
        matchPair = true;

        // Increase the number of pairs
        numPairs += 1;

        prevPlayerChoice1 = null;
        prevPlayerChoice2 = null;
        
    // Hide emojis otherwise    
    } else {

        // There is no match
        matchPair = false;

        // Increase the number of tries
        numTries += 1;

        // If the cards don't match, hide them during next click
        prevPlayerChoice1 = playerChoice1;
        prevPlayerChoice2 = playerChoice2;
    }

    // Reset current choices
    playerChoice1 = null;
    playerChoice2 = null;


    // Check if the player wins or not
    if (numPairs === 6) {
        winner = true;
    } else if (numTries === 10) {
        gameOver = true;
    }

};

/*----------------------------- Event Listeners -----------------------------*/
boardElement.addEventListener('click', handleClick);
resetBtnElement.addEventListener('click', init);