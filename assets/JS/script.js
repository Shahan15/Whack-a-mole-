/*goes through array of moleids and loops through them and adds 
eventlisteners for all of them */
const moleids = ['mole1','mole2','mole3','mole4','mole5'];
let activeInterval = null;
let countdownInterval = null;
let remainingTime = 30; // Default game time in seconds


moleids.forEach((id) => {
    let mole = document.getElementById(id);
    mole.addEventListener("click",molehidingClicked);
})


//instead of calling so many elements we can store that call in a single object. cleaner 
const elements = {
    countdown: document.getElementById('countdown'),
    score: document.getElementById('scorenumber'),
    easyButton: document.getElementById('easy'),
    mediumButton: document.getElementById('medium'),
    hardButton: document.getElementById('hard'),
};

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
 * Mole moving down when clicked to mimic popping up and down
 */
function molehidingClicked (event) { 
    let clickedmole = event.target; // Get the clicked mole
    clickedmole.style.transform = "translateY(50px)"; // Hide the mole
    clickedmole.style.transition = "transform 0.2s ease";
    clickedmole.setAttribute("data-clicked","true");
    Updatescore();
}

/**
 * score counter 
 */
function Updatescore () {
    let score = parseInt(document.getElementById('scorenumber').innerHTML );
    document.getElementById('scorenumber').innerText = score + 1 ;
}


const time = (seconds) => {
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

const startTimer = (callBack) => {
    countdownInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            elements.countdown.innerText = time(remainingTime); //calls the countdown element from the elements objects from earlier
        } else {
            clearInterval(countdownInterval);
            if (callBack) callBack(); //this is named callBack as we are passing a function in place of the callBack parameter. So it is a callback function
        }
    }, 1000);
};//when the timer ends we call the function that has been passed in as a parameter i.e. resetGame()


let easyInt,mediumInt,hardInt;

/**
 *Easy mode 
 */
 function easy() {
    easyInt  = setInterval(() => { //setInterval executes function on repeat waiting x amount of time in between each time
        // Selects a random mole. Cannot use for loop as that goes in order.
        let randomIndex = Math.floor(Math.random() * moleids.length);
        let randomMole = moleids[randomIndex]; //uses indexed mole to get specific moleid from html doc
        let htmlMoleId = document.getElementById(randomMole); 

        htmlMoleId.style.transform = "translateY(-10px)"; // Move mole up
        htmlMoleId.style.transition = "transform 0.2s ease"; // Smooth animation
        htmlMoleId.setAttribute("data-clicked", "false"); // Reset clicked state

        // Check after 1400ms if it wasn't clicked then go down
        setTimeout(() => { //setTimeout executes a function after x amount of time 
            let clickedState = htmlMoleId.getAttribute("data-clicked");
            if (clickedState === "false") { //checks if the mole has been clicked or not
                htmlMoleId.style.transform = "translateY(40px)"; // Move mole down
            }
        }, 1400); // Timeout before moving mole back down
    }, 2500); //pops up every 2500ms
}


/**
 * Medium level function
 */
function medium () {
    mediumInt= setInterval(() => {
        let randomIndex = Math.floor(Math.random() * moleids.length);
        let randomMole = moleids[randomIndex];
        let htmlMoleId = document.getElementById(randomMole);

        htmlMoleId.style.transform = "translateY(-10px)"; 
        htmlMoleId.style.transition = "transform 0.2s ease"; 
        htmlMoleId.setAttribute("data-clicked", "false"); 

        setTimeout(() => {
            let clickedState = htmlMoleId.getAttribute("data-clicked");
            if (clickedState === "false") {
                htmlMoleId.style.transform = "translateY(40px)";
            }
        }, 1300); 
    }, 1600); // Repeat every 1600ms
}

/**
 * Hard level function
 */
function hard () {
    hardInt=setInterval(() => {
 
        let randomIndex = Math.floor(Math.random() * moleids.length);
        let randomMole = moleids[randomIndex];
        let htmlMoleId = document.getElementById(randomMole);

        htmlMoleId.style.transform = "translateY(-10px)"; 
        htmlMoleId.style.transition = "transform 0.2s ease"; 
        htmlMoleId.setAttribute("data-clicked", "false"); 

        setTimeout(() => {
            let clickedState = htmlMoleId.getAttribute("data-clicked");
            if (clickedState === "false") {
                htmlMoleId.style.transform = "translateY(40px)"; 
            }
        }, 1000); // Timeout before moving mole back down
    }, 1200); // Repeat every 1200ms
}



/**
 * Resets the score after one game 
 */
function resetScore () { 
    let score = 0;
    document.getElementById('scorenumber').innerText = score;
}


/**
 * function to reset the game 
 */

