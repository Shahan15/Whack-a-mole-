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
   
}

/**
 * score counter 
 */
function score () {

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
    const interval = setInterval(() => { //setInterval repeats a function over a specified time
        let randomIndex = Math.floor(Math.random() * moleids.length); // Selects a random mole. Cannot use for loop as that goes in order.
        let randomMole = moleids[randomIndex]; //indexed mole
        let htmlMoleId = document.getElementById(randomMole); //uses indexed mole to get specific moleid from html doc
        htmlMoleId.style.transform = "translateY(60px)"; 
        htmlMoleId.style.transition = "transform 0.2s ease";

        setTimeout(() => { 
            htmlMoleId.style.transform = "translateY(0)";
        },600); // Delay before the mole goes back down
    }, 2000); // Repeat every 2 seconds --> determines how often the mole pops up 
    
} 

/**
 * Medium level function
 */
function medium () {

}

/**
 * Hard level function
 */
function hard () {

}


