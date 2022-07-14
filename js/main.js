function run(){ // IT´S ACTIVATED ONCE THE PAGE LOADS.
    if (buttonIsAppear == false){
        buttonIsAppear = true;
        reset();
        showButton();
    }
}

function addBackgroundWhite(card){ // CHANGE THE CARD´S BACKGROUND COLOR TO WHITE ONCE IT´S CLICKED  
    card.classList.add("background-white");
}

function removeBackgroundWhite(card){ // REMOVE THE WHITE BACKGROUND COLOR WHEN THE CHOSEN CARDS HAVE DIFFERENT IMAGES
    card.classList.remove("background-white");
}

function addBlur(image){ // ADD BLUR ONCE THE CHOSEN CARDS HAVE THE SAME IMAGE
    image.classList.add("blur");
}

function removeBlur(card){
    cardImage = card.querySelector("img");
    cardImage.classList.remove("blur");
}

function pushListImage(cardImage){ // APPEND THE IMAGE FROM CARD TO THE LIST CARD
    listImage.push(cardImage);
}

function pushListCard(card){ // APPEND THE CARD TO THE LIST CARD
    listCard.push(card);
}

function resetList(){ // EMPTY THE LIST
    list = [];
    return list;
}

function countPoint(){
    counterPoint++;
}

function pointTrue(image1, image2){ // IT´S ACTIVATED WHEN THE CHOSEN CARDS HAVE THE SAME IMAGE
    addBlur(image1);
    addBlur(image2);
    addCardToFlippedCardsList(image1);
    listImage = resetList();
    listCard = resetList();
}

function pointFalse(image1, image2){ // IT´S ACTIVATED WHEN THE CHOSEN CARDS HAVE THE DIFFERENT IMAGES
    setTimeout(differentCards, 500, image1, image2);
    setTimeout(removeBackgroundWhite, 500, listCard[0]);
    setTimeout(removeBackgroundWhite, 500, listCard[1])
    listImage = resetList();
    listCard = resetList();
}

function checkCards(cardImage){ // FUNCTION WITH A ROLE TO ANALYSE THE CHOSEN CARDS
    pushListImage(cardImage);
    if (listImage.length == 2){
        var image1 = listImage[0];
        var image2 = listImage[1]; 
        const point = siblingCards(image1, image2);
        if (point == false){
            pointFalse(image1, image2);
        } else {
            pointTrue(image1, image2);
            countPoint();
            console.log(flippedCardsList);
            return true;
        }
}
}

function showImage(card){ // SHOW IMAGE FROM THE CARD ONCE THE CARD IS CLICKED
    const cardImage = card.querySelector("img");
    cardImage.classList.add("show");
    
    return cardImage;
}

function removeImage(card){
    const cardImage = card.querySelector("img");
    cardImage.classList.remove("show");
}

function showButton(){ // SHOW BUTTON WHEN THE PAGE LOADS
    BUTTON.classList.add("show");
    CARDS.classList.remove("show");
}

function buttonCounter(){
    if (counterButton > 0){
        CARD.forEach(card => {
            removeImage(card);
            removeBackgroundWhite(card);
            removeBlur(card);
        })
    } else {
        return;
    }
}

function showCards(){ // SHOW CARD CONTAINER WHE THE BUTTON IS CLICKED
    if (cardIsAppear == false){
        buttonIsAppear = false;
        cardIsAppear = true;

        BUTTON.classList.remove("show");
        CARDS.classList.add("show");
        start();
    }
}

function showFinalGameContainer(){
    FINAL_GAME_CONTAINER.classList.add("show");
    pause();
    flippedCardsList = resetList(flippedCardsList);
    YOUR_TIME.innerText = "Your Time: " + MINUTE.innerText + ":" + SECOND.innerText + ":" + MILLISECOND.innerText;
}

function removeFinalGameContainer(){
    FINAL_GAME_CONTAINER.classList.remove("show");
    counterPoint = 0;
    buttonIsAppear = false;
    cardIsAppear = false;
    window.onload = run();
}

function siblingCards(img1, img2){ // FUNCTION WITH A ROLE TO CHECK IF THE CHOSEN CARDS HAVE THE SAME IMAGE RETURNING A BOOLEN VALUE
    let altImg1 = img1.alt.slice(0, -1);
    let altImg2 = img2.alt.slice(0, -1);

    let imgValue1 = img1.alt.slice(-1);
    let imgValue2 = img2.alt.slice(-1)

    if(altImg1 == altImg2 && imgValue1 != imgValue2){
        return true;
    } else {
        return false;
    }
}

function differentCards(img1, img2){ // IT´S ACTIVATED WHEN THE CHOSEN CARDS HAVE DIFFERENT IMAGES
    img1.classList.remove("show");
    img2.classList.remove("show");
}


function clickFlippedCards(card){
    let cardImage = card.querySelector("img");
    let cardImageAlt = cardImage.alt.slice(0, -1);
    for(let i = 0; i < flippedCardsList.length; i++){
        if (cardImageAlt == flippedCardsList[i]){
            return true;
        }
    }
    return false;
}

function addCardToFlippedCardsList(img){ // APPEND THE IMAGE ALT TO THE FLIPPED CARDS LIST
    flippedCardsList.push(img.alt.slice(0, -1));
}

function start(){ // START THE CRONOMETER
    reset(); 
    cron = setInterval(timer, 10);
}

function reset(){ // RESET THE CRONOMETER
    minute = 0;
    second = 0;
    millisecond = 0; 

    MINUTE.innerText = "00";
    SECOND.innerText = "00"
    MILLISECOND.innerText = "00";
}

function pause(){ // PAUSE THE CRONOMETER
    clearInterval(cron);
}

function timer() { // FUNCTIONS THAT COUNTS THE TIME WHILE THE GAME IS RUNNING
    if ((millisecond += 10) == 1000) {
      millisecond = 0;
      second++;
    }
    if (second == 60) {
      second = 0;
      minute++;
    }

    MINUTE.innerText = minute;
    SECOND.innerText = second;
    MILLISECOND.innerText = millisecond;
}

/*********VARIABLES********/
const BUTTON = document.querySelector(".button-play"); // BUTTON VARIABLE
const CARDS = document.querySelector(".cards"); // CARD CONTAINER VARIABLE
const CARD = document.querySelectorAll(".card"); //CARD VARIABLE 

const FINAL_GAME_CONTAINER = document.querySelector(".final-game-container");
const YOUR_TIME = document.querySelector(".final-game .your-time");

var flippedCardsList = []; // LIST TO SAVE FLIPPED CARDS
var listImage = []; // LIST TO SAVE IMAGE FROM CHOSEN CARDS
var listCard = []; // LIST TO SAVE CHOSEN CARDS

BUTTON.addEventListener("click", function(){
    buttonCounter();
    showCards();
    counterButton++;
})

    CARD.forEach(card => {
    card.addEventListener("click", function(){
        itsAlreadyClicked = clickFlippedCards(card);
        console.log(itsAlreadyClicked);
        if (itsAlreadyClicked == true){
            return
        } else{
            addBackgroundWhite(card);
            pushListCard(card);
            cardImage = showImage(card);
            checkCards(cardImage);
            if (counterPoint==8) {
                showFinalGameContainer();
                console.log(YOUR_TIME);
                return true;
            }
        }
    })
});

var buttonIsAppear = false; // CONDITIONAL VARIABLE FOR BUTTON
var cardIsAppear = false; // CONDITIONAL VARIABLE FOR CARD CONTAINER

var minute = 0; // MINUTE VARIABLE FROM CRONOMETER
var second = 0; // SECOND VARIABLE FROM CRONOMETER
var millisecond = 0; // MILLISECOND VARIABLE FROM CRONOMETER

const MINUTE = document.getElementById("minute");
const SECOND = document.getElementById("second");
const MILLISECOND = document.getElementById("millisecond");

var cron; // CRONOMETER VARIABLE

var isDifferent; // VARIABLE FOR CHECKING IF THE CHOSEN CARDS ARE DIFFERENT;
var isNewFlippedCard; // VARIABLE FOR CHECKING IF THE CLICKED CARD HAS BEEN CLICKED BEFORE
var itsAlreadyClicked;

var counterPoint = 0; // POINTS COUNTER
var counterButton = 0; // BUTTON CLICKING COUNTER
/**************************/

window.onload = run();