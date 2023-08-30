let cards = [];
let myCards = [];
let suits = ["hearts","clubs","diamonds","spades"];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector(".sum-el");
let cardsEl = document.getElementById("cards-el");
let imageContainerEl = document.getElementById("imageContainer-el");

let player = {
    name: "Ivan",
    chips: 140
}

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard(){
    let randomSuit = Math.floor(Math.random()*3)
    let randomCard = Math.floor(Math.random()*13) + 1;
    let myCardName=suits[randomSuit] +  randomCard;
    console.log("myCardName: " + myCardName)
    let value = 0;
    while(myCards.includes(suits[randomSuit] +  randomCard)){
        randomSuit = Math.floor(Math.random()*3)
        randomCard = Math.floor(Math.random()*13) + 1;
        myCardName = suits[randomSuit] +  randomCard;
        
    }
    myCards.push(myCardName);

    if (randomCard === 1) {
        value = 11;
    } else  if(randomCard >10) {
        value = 10;
    } else {
        value = randomCard;
    }
    let imageAddress = `images/${suits[randomSuit]}/${randomCard}.png`;
    
    // card object contain card's {suit, number, value, image} e.g {clubs, 10, 10, "/images/clubs/10.png"}
    let myCardObject = {
        randomSuit: randomSuit, 
        randomCard: randomCard, 
        value: value, 
        imageAddress: imageAddress};
    console.log(myCardObject)
    return myCardObject;
}

function startGame() {
    isAlive = true;
    if(cards.length){cards = []}
    let firstCard = getRandomCard();
    cards.push(firstCard)

    let secondCard = getRandomCard();
    cards.push(secondCard)
    sum = firstCard.value + secondCard.value;

    renderGame();
}

function renderGame(){
    sumEl.textContent = "Sum: " + sum;
    cardsEl.textContent = "Cards: ";
    while (imageContainerEl.firstChild) {
        imageContainerEl.removeChild(imageContainerEl.firstChild);
      }
    for (let index = 0; index < cards.length; index++) {
        // cardsEl.textContent += cards[index] + " ";
        var newItem = document.createElement("li");
        const imgElement = document.createElement("img");
        imgElement.src = cards[index].imageAddress;
        imgElement.width = 80;
        imgElement.height = 116;
        imgElement.style.margin = "10px";
        imgElement.alt = cards[index].randomCard;
        newItem.append(imgElement);
        imageContainerEl.append(newItem)
        
    }
    if (sum <= 20) {
        message = "Do you want to draw a new card? ";
    } else if (sum === 21){
        message =  "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    console.log(message);
    messageEl.textContent = message;
}

function newCard() {
    if(isAlive && hasBlackJack === false){
        let card = getRandomCard();
        sum += card.value;
        cards.push(card);
        renderGame();
    }
    
}



