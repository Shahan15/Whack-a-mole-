/*goes through array of moleids and loops through them and adds 
eventlisteners for all of them */
const moleids = ['mole1','mole2','mole3','mole4','mole5'];
moleids.forEach((id) => {
    let mole = document.getElementById(id);
    mole.addEventListener("click",molehidingClicked);
})
/**
 * Mole moving down when clicked to mimic popping up and down
 */
function molehidingClicked (event) { 
    let clickedmole = event.target; // Get the clicked mole
    clickedmole.style.transform = "translateY(50px)"; // Hide the mole
    clickedmole.style.transition = "transform 0.2s ease";
    clickedmole.setAttribute("data-clicked","true")
    score()
}

/**
 * score counter 
 */
function score () {
    let score=0
    
}

/**
 * Play again button 
 */
function playAgain() {

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
    }, 2000); //pops up every 2 seconds
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
        }, 800); 
    }, 1000); // Repeat every 1 second
}

/**
 * Hard level function
 */
function hard () {
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
        }, 600); // Timeout before moving mole back down
    }, 800); // Repeat every 800ms
}


