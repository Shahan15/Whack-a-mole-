/*goes through array of moleids and loops through them and adds 
eventlisteners for all of them */
const moleids = ['mole1','mole2','mole3','mole4','mole5'];
moleids.forEach((id) => {
    let mole = document.getElementById(id);
    mole.addEventListener("click",molehidingClicked);
})


function easyhandler () {
    document.getElementById("easy").addEventListener("click", () => {
        if(confirm("are you sure you would like to begin easy mode?")){
            setTimeout(()=>{
                resetScore()
                easy()
            },3000)//function exectues in 3 seconds.
        } 
    });
}

function mediumhandler () {
    document.getElementById("medium").addEventListener("click", () => {
        if(confirm("are you sure you would like to begin medium mode?")){
            setTimeout( () => {
                resetScore();
                medium();
            },3000);
        } 
    });
}

function hardhandler () {
    document.getElementById("hard").addEventListener("click", () => {
        if(confirm("are you sure you would like to begin hard mode?")){
            setTimeout(()=>{
                resetScore()
                hard()
            },3000)
        } 
    });
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

function resetScore () { 
    let score = 0;
    document.getElementById('scorenumber').innerText = score;
}




const startingMinutes = 0.5;
let time = startingMinutes * 60; //converts mins to seconds. 

const countdownEl = document.getElementById('countdown');

setInterval(timer,1000)

function timer () {
    const minutes = Math.floor(time/60)
    let seconds = time % 60

    countdownEl.innerHTML=`0${minutes}: ${seconds}`;

    if(time <= 0) {
        time=startingMinutes*60
        countdownEl.innerHTML=`0${minutes}:0${seconds}`;
    }

    if(time < 10) {
        countdownEl.innerHTML=`${minutes}:0${seconds}`;
    }
    time--
}

/**
 *Easy mode 
 */
 function easy() {
    setInterval(() => { //setInterval executes function on repeat waiting x amount of time in between each time
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
            if (clickedState === "false") { //checked if the mole has been clicked or not
                htmlMoleId.style.transform = "translateY(40px)"; // Move mole down
            }
        }, 1400); // Timeout before moving mole back down
    }, 2500); //pops up every 2500ms
}

/**
 * Medium level function
 */
function medium () {
    setInterval(() => {
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
    let hardsetinterval=setInterval(() => {
 
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


