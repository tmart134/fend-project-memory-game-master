/********************************************************

Author: Tracey Martin
Sources:
https://www.w3schools.com/
http://api.jquery.com/jQuery.ajax/
https://developer.mozilla.org/en-US/
Udacity videos 

TODO:
1- styling 
2- unspaghetti the code
3- update all conditionals to use the conditional operator
4- tablet and phone rendering in the CSS

**********************************************************/


    let memoryCards = [];
    let shuffledMemoryCards = [];
    let moveCounter = 0;
    let matchCounter = 0;
    let cardList = [];
    let openCards = [];
    let stars = 3;
    let moveCount = document.querySelector('.moves');
    let matchMessage = document.querySelector('.match-message');
    let matchModal = document.querySelector('.match-modal');
    let closeModal = document.querySelector('.close');
    let playAgain= document.querySelector('.restart');
    let time = 0;
    let startGame;


/*************Shuffle function from http://stackoverflow.com/a/2450976************/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 //create deck of memory cards
function createDeck() {
   
    memoryCards = ["anchor", "diamond", "cube","bolt","paper-plane-o", "leaf","bicycle", "bomb","anchor", "diamond", "cube","bolt","paper-plane-o", "leaf","bicycle", "bomb"];

}

//shuffle the cards
function shuffleDeck(cards) {
    
    shuffledMemoryCards = shuffle(cards);
}

/******************setup the cards and create the game board***************/

function createGameBoard() {

    shuffleDeck(memoryCards);

    //select all cards in the deck
    let cardList = document.getElementsByClassName('card');

    $.each(cardList,function (x){
        //create icon element
        let iElement = document.createElement("i");
        //store the image
        let cardImage = "fa-" + shuffledMemoryCards[x];
        iElement.classList.add("fa", cardImage);
        //check console.log(iElement);
        this.append(iElement);
    });
}

/*****************checking for matches***********************/

//cards match 
function match() {
    openCards[0][0].parentNode.classList.add("match");
    openCards[1][0].parentNode.classList.add("match");
    openCards = [];
    matchCounter += 1;
}

//cards do not match
function noMatch(){
    setTimeout(function(){
        openCards[0][0].parentNode.classList.remove("open");
        openCards[0][0].parentNode.classList.remove("show");
        openCards[1][0].parentNode.classList.remove("open");
        openCards[1][0].parentNode.classList.remove("show");
        openCards = [];
    }, 900);
}


/*********increment move counter, display the moves and stars********/

function updateMoves(){

    let moveStars = document.querySelector('.stars');
    moveCounter += 1;
    moveCount.innerHTML = moveCounter.toString();
    
    switch (moveCounter){
        case 14:
            moveStars.removeChild(moveStars.firstChild);
            stars--;
            break;
        case 24:
            moveStars.removeChild(moveStars.firstChild);
            stars--;
            break;
         case 30:
            moveStars.removeChild(moveStars.firstChild);
            stars--;
            break;       
        default:
            break;    
    }
}

/**************************play again****************************/
//from the board and play again button on the modal
function resetGame() {

    location.reload();
}

/***************************set time*******************************/
//https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
 function setTime(time){

    //get the minutes
    var minutes = Math.floor(time / 60);
    //convert back to seconds to get the ss in  min:ss
    time -= minutes * 60;

    var seconds = parseInt(time % 60, 10);


    
    var newTime = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);


    return newTime;
 }


createDeck();
createGameBoard();


/*************************play game**************************/

$('.deck').on( 'click', 'li', function(event) {
        
    if (time === 0){ 
       var gameTimer = setInterval(function(){
            time++;
            var timeFormatted = setTime(time);
            document.getElementById("timer").innerHTML = timeFormatted;

            if (matchCounter === 8) {
                clearInterval(gameTimer);
                starMessage = stars + "stars!!!  ";
                if (stars === 0){
                    matchMessage.innerHTML = "No stars! " + moveCounter + " moves!  Time: " + timeFormatted;
                } else {
                    matchMessage.innerHTML = starMessage + moveCounter + " moves!  Time: " + timeFormatted;
            }
            matchModal.style.display = "block";
            }    
            }, 1000);
        }
            

        let selectedCard = $( event.target );
        
        if (selectedCard.hasClass("match")){
            alert("Already matched");
        } else if (selectedCard.hasClass("open")){
                alert("Already selected");
        } else if ( openCards.length < 2 )  {
            openCards.push(selectedCard.children());
            selectedCard.addClass("open show");

            //check for match
            if ( openCards.length === 2){
                if ( openCards[0][0].className  === openCards[1][0].className) {
                    
                    match();
               } 
                else {
                    
                    noMatch();
                 
                } 
                //update Moves
                updateMoves();
            }
        } else {
            alert("Two cards at a time"); 
        }
        
});

//reset game
playAgain.addEventListener('click', resetGame);


//close the winning game message
closeModal.addEventListener('click', function(){ 
    matchModal.style.display = "none";
    })