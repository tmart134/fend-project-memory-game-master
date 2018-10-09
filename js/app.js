

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


// Shuffle function from http://stackoverflow.com/a/2450976
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

// setup the cards and create the game board
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


//update the move counter and the moves and stars on the game
function updateMoves(){

   let moveStars = document.querySelector('.stars');
    moveCounter += 1;
    moveCount.innerHTML = moveCounter.toString();
    
    switch (moveCounter){
        case 14:
            moveStars.removeChild(moveStars.firstChild);
            stars = 2
        case 31:
            moveStars.removeChild(moveStars.firstChild);
            stars = 1;
            break;    
        default:
            break;    
    }
}

//play again
function resetGame() {

    location.reload();
}

createDeck();
createGameBoard();


//play game
$('.deck').on( 'click', 'li', function(event) {
        
       if (time === 0){ 
       var gameTimer = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = time;
            if (matchCounter === 8) clearInterval(gameTimer);  
            }, 1000);
        }
            

        let selectedCard = $( event.target );
    
        //show card and add to array if length less than 2 
        if ( openCards.length < 2 && !selectedCard.hasClass("open"))  {
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
        }
        else {
            
            alert("No double clicking!");
        }

        //check for game win
        //TODO: make not ugly
        if (matchCounter === 8) { 
            starMessage = "You got " + stars + "!!! ";

            if (stars === 0){
                matchMessage.innerHTML = "No stars for you " + moveCounter + " moves! Time: " + time;
            } else {
                matchMessage.innerHTML = starMessage + moveCounter + " moves! Time: " + time;
            }
            matchModal.style.display = "block";
        }
});

//reset game
playAgain.addEventListener('click', resetGame);

//close the winning game message
closeModal.addEventListener('click', function(){ 
    matchModal.style.display = "none";
    })
