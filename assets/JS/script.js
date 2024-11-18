const moleids = ['mole1','mole2','mole3','mole4','mole5']

/*goes through array of moleids and loops through them and adds 
eventlisteners for all of them */
moleids.forEach((id) => {
    let mole = document.getElementById(id);
    mole.addEventListener("click",molehidingClicked);
})

//Mole hiding when clicked
function molehidingClicked (event) { 
    let clickedmole = event.target; // Get the clicked mole
    clickedmole.style.transform = "translateY(50px)"; // Hide the mole
    clickedmole.style.transition ="transform 0.2s ease";
}

//Mole appearing randomly from ground 
function randomMole () {

}

//Score counter 
function score () {

}

//Play again button 
function playAgain() {

}

//Easy level 
function easy () {
    
}

//Medium level
function medium () {

}

//Hard level
function hard () {

}


