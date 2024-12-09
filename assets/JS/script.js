document.getElementById("playgame").addEventListener('click', () => {
    window.location.href = "index.html"
});

/*global variables*/
const moleids = ['mole1','mole2','mole3','mole4','mole5'];
let activeInterval = null; 
let countdownInterval = null;
let remainingTime = 30; // Default game time in seconds

//instead of calling so many elements we can store that call in a single object. cleaner 
const elements = {
    countdown: document.getElementById('countdown'),
    score: document.getElementById('scorenumber'),
    easyButton: document.getElementById('easy'),
    mediumButton: document.getElementById('medium'),
    hardButton: document.getElementById('hard'),
};


/**
 * assigns easy buttons event listners 
 */
const modeListeners = () =>  {
    elements.easyButton.addEventListener('click', () => gamemode('easy'));
    elements.mediumButton.addEventListener('click', () => gamemode('medium'));
    elements.hardButton.addEventListener('click', () => gamemode('hard'));
}

/*instead of having multiple handlers doing the same thing i.e. initialising easy mode,medium and hard. 
we just have a single function -->  gamemode (mode).
the game mode parameters such as the interval i.e. time gap between how long each mole appears and duration is how long they stay up for
these are stored in an object. no need for multiple functions doing the same thing */ 
const gamemode = (mode) => {
    const modes = {
        easy: {interval: 2500, duration:1400},
        medium: {interval: 1600, duration:1300},
        hard: {interval: 1200, duration:1000}
    }

    if (modes[mode]) {
        resetGame();
        if (confirm(`are you sure you want to start ${mode} mode?`)) {
            startTimer(resetGame)
            startGame(modes[mode].interval, modes[mode].duration); // Start game 
        } //modes is the object and mode that we are passing in is the level and its associated interval and duration
    } else {
        console.error('Invalid game mode specified.');
    }
}

/**
 * score counter 
 */
function updateScore () {
    //10 refers to base 10. if parsed value is invalid the fall back is 0 (that is what the || is doing (falsy))
    const currentScore = parseInt(elements.score.innerText, 10 ) || 0; 
    elements.score.innerText = currentScore + 1 ;
}


/** 
 * Time function 
*/
const time = (seconds) => {
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/** 
 * countdown starter 
*/
const startTimer = (callback) => {
    countdownInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            elements.countdown.innerText = time(remainingTime); //calls the countdown element from the elements objects from earlier
        } else {
            clearInterval(countdownInterval);
            alert(`Game Over! you scored ${elements.score.innerText}. Try beat your score!`)
            if (callback) callback(); //this is named callBack as we are passing a function in place of the callBack parameter. So it is a callback function
        }
    }, 1000);
};//when the timer ends we call the function that has been passed in as a parameter i.e. resetGame()


/**
 * Initialise mole click listeners, assigns event listeners for each mole 
 */
const initialiseMoles = () => {
    moleids.forEach((id) => {
        const mole = document.getElementById(id);
        mole.addEventListener('click', (event) => {
            if (event.target.getAttribute('data-clicked') === 'false') {
                event.target.style.transform = 'translateY(50px)'; // Hide mole when clicked
                event.target.setAttribute('data-clicked', 'true'); // Mark as clicked
                updateScore();  // Increment the score
            }
        });
    });
};


/**
 * function for the moles to pop up randomly 
 */
const startGame = (intervalDuration, popUpDuration) => {
    activeInterval = setInterval(() => {
        // Randomly select a mole to pop up
        const randomIndex = Math.floor(Math.random() * moleids.length);
        const randomMole = document.getElementById(moleids[randomIndex]);
        //cannot use a for loop as the that goes in order and we want random selection

        // Mole selected pops up 
        randomMole.style.transform = 'translateY(-10px)';
        randomMole.style.transition = 'transform 0.2s ease';
        randomMole.setAttribute('data-clicked', 'false');

        // Hide the mole after popUpDuration if it wasn't clicked
        setTimeout(() => {
            if (randomMole.getAttribute('data-clicked') === 'false') {
                randomMole.style.transform = 'translateY(40px)';
            }
        }, popUpDuration);
    }, intervalDuration);
};


/**
 * begin game 
 */
const initialiseGame = () => {
    initialiseMoles();  // Add click event listeners to moles
    modeListeners();  // Add click event listeners to mode buttons
    resetGame();  // Reset the game state to start fresh
}

/**
 * function to reset the game 
 */
const resetGame = () => {
    // Clear existing intervals
    clearInterval(activeInterval);
    clearInterval(countdownInterval);

    // Reset timer and score
    remainingTime = 30;
    elements.countdown.innerText = time(remainingTime);
    elements.score.innerText = '0';

    // Reset mole states
    moleids.forEach((id) => {
        const mole = document.getElementById(id);
        mole.style.transform = 'translateY(40px)'; // Reset mole position to hidden
        mole.setAttribute('data-clicked', 'false'); // Reset clicked state
    });
};

initialiseGame()