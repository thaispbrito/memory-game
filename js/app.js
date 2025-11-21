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
const pairs = [
    '🌋', '🌋', '🏞️', '🏞️', 
    '⛰️', '⛰️', '🥾', '🥾', 
    '🍂', '🍂', '🐻', '🐻',
    '🌲', '🌲', '⛺', '⛺',
    '🧭', '🧭', '🚣‍♀️', '🚣‍♀️'
];

const matchAudio = new Audio('./media/match.mp3');
const mismatchAudio = new Audio('./media/mismatch.mp3');
const winnerAudio = new Audio('./media/winner.mp3');
const gameOverAudio = new Audio('./media/game_over.mp3');

const jsConfetti = new JSConfetti(); 

/*---------------------------- Variables (state) ----------------------------*/
let boardItems;  
let numPairs;
let matchPair;  
let winner;
let gameOver;  
let playerChoice1;
let playerChoice2;
let prevPlayerChoice1;
let prevPlayerChoice2;
let countDown;
let intervalTime;
let clickedStart;
let matchedItems;

/*------------------------ Cached Element References ------------------------*/
const emojiElements = document.querySelectorAll('.emoji');
const messageElement = document.querySelector('#message');
const boardElement = document.querySelector('.board');
const resetBtnElement = document.querySelector('#reset');
const startElement = document.querySelector('#start');
const timerElement = document.querySelector('.timer-display')
const instElement = document.querySelector('#instructions');
const modalElement = document.querySelector('#instructions-modal');
const exitElement = document.querySelector('#exit');

/*-------------------------------- Functions --------------------------------*/
function init() {

    // The emojis will be all hidden from start
    boardItems = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];  
    
    shuffleGame();
    numPairs = 0;
    matchPair = false;
    winner = false;
    gameOver = false;
    playerChoice1 = null;
    playerChoice2 = null;
    prevPlayerChoice1 = null;
    prevPlayerChoice2 = null;
    matchedItems = [];  // It will be used to store the matched pairs and prevent them to be clicked again
    resetTimer();
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
        messageElement.textContent = `Pairs:${numPairs}`
    } else if(!winner && !gameOver && !matchPair) {
        // Update the message with the new number of tries
        messageElement.textContent = `Pairs:${numPairs}`
    } else if(winner) {
        // Update the message congratulating the player for winning the game
        messageElement.textContent = `Congratulations! You just won the game!`
    } else {
        // Update the message letting the player know that the game is over
        messageElement.textContent = `Game Over!`
    }
};

// Create a function to handle the clicks
function handleClick(event) {

    // Exit the function if the start button has not been clicked yet
    if (!clickedStart) {
        return;
    }
    
    // Exit the function if the game is over
    if (gameOver) {
        return;
    }

    // Check if the clicked element is an emoji, exit otherwise
    if (!event.target.classList.contains('emoji')) {
        return;
    }
    
    // Set the emoji index
    const emojiIdx = parseInt(event.target.id);

    // Ignore clicks on matched emojis
    if (matchedItems.includes(emojiIdx)) {
        return;
    }

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

// Create a function to check the choices and if the player wins or not
function checkGameState() {
    
    // Check if there is a match, if so do not hide matched emojis
    if (pairs[playerChoice1] === pairs[playerChoice2]) {
        
        // There is a match
        matchPair = true;

         // Play the match audio right away
        playMatchAudio()

        // Increase the number of pairs
        numPairs += 1;

        matchedItems.push(playerChoice1, playerChoice2);

        // In this case, there's no need to hide the emojis again during the next click,
        // so, reset the variables below
        prevPlayerChoice1 = null;
        prevPlayerChoice2 = null;
        
    // Hide emojis otherwise    
    } else {

        // There is no match
        matchPair = false;

        // Play the mismatch audio right away
        playMismatchAudio();

        // If the cards don't match, hide them during next click
        prevPlayerChoice1 = playerChoice1;
        prevPlayerChoice2 = playerChoice2;
    }

    // Reset current choices
    playerChoice1 = null;
    playerChoice2 = null;


    // Check if the player wins
    if (numPairs === pairs.length/2) {
        winner = true;

        // Play the winner audio right away
        playWinnerAudio()

        // Release confetti
        jsConfetti.addConfetti()
    }
};


// Create a function to set up timer details
function timerDetails() {

    timerElement.textContent = countDown + " secs ";

    if (countDown <= 0) {

        gameOver = true;

        render();

        playGameOverAudio()

        // Use the same library for the confetti,
        // but with skulls when the game is over
        jsConfetti.addConfetti({
            emojis: ['💀', '☠️'],
            emojiSize: 60,
            confettiNumber: 20
        })

        resetTimer();
    }
    countDown -= 1;

    // If the player wins, freeze the timer 
    render();
    if(winner) {
        clearInterval(intervalTime);  // Stops the timer
    }

}

// Create a function to set up a countdown for the game
function setTimer() {

    // If the game is over, click the `Reset` button first to
    // be able to trigger the countdown again by clicking the `Start` button
    if (!gameOver) {
        intervalTime ??= setInterval(timerDetails, 1000);

        // Start the game once the button `Start` has been clicked
        clickedStart = true;
    } 
}

// Reset timer
function resetTimer() {

    clearInterval(intervalTime);  // Stops the timer

    timerElement.textContent = "";

    countDown = 60;

    intervalTime = null;  // Set it to null to be able to create a new interval

    clickedStart = false;
}

// Create a function to play the match audio
function playMatchAudio() {

    // Reset the sound if already played
    matchAudio.currentTime = 0;
    matchAudio.volume = .1;
    matchAudio.play();
}

// Create a function to play the mismatch audio
function playMismatchAudio() {

    // Reset the sound if already played
    mismatchAudio.currentTime = 0;
    mismatchAudio.volume = .1;
    mismatchAudio.play();
}

// Create a function to play the winner audio
function playWinnerAudio() {

    // Reset the sound if already played
    winnerAudio.currentTime = 0;
    winnerAudio.volume = .1;
    winnerAudio.play();
}

// Create a function to play the game over audio
function playGameOverAudio() {

    // Reset the sound if already played
    gameOverAudio.currentTime = 0;
    gameOverAudio.volume = .1;
    gameOverAudio.play();
}

/*----------------------------- Event Listeners -----------------------------*/
boardElement.addEventListener('click', handleClick);
resetBtnElement.addEventListener('click', init);
startElement.addEventListener('click', setTimer);


// For a popup window to show the game instructions to the player
instElement.addEventListener('click', () => {
    modalElement.style.display = 'block';
});

exitElement.addEventListener('click', () => {
    modalElement.style.display = 'none';
});