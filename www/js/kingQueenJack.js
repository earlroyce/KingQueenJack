/*
 * Game Scripts by Earl Royce Hugo
 * Shuffle Cards, Display, Remove
 */

var suitName = ["♠", "♣", "♥", "♦"],
	// cardFace = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"],
	cardFace = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
	deck = [],
	deckNum = [],
	shuffledDeck = [],
	shuffledDeckNum = [],
	graveyardDeck = [];
	
var matcher = -1;

function arrange() {	
	
	deck = [];
	deckNum = [];
	graveyardDeck = [];
	
	// console.log("Arrange function called.");
	// Build arranged deck with name
	for (let suit of suitName) {
		for (let face of cardFace) {
			let card = face + " of " + suit;
			deck.push(card);
		}
	}

	// Build arranged deck with ordered pair
	let x = 0, /* suit */
		y = 0; /* face */
		
	for (x = 0; x < suitName.length; x++) {
		for (y = 0; y < cardFace.length; y++) {
			deckNum.push([x,y]);
		}
	}
}

arrange();

var pile = deckNum.length,
	grave = graveyardDeck.length;

// console.log(deckNum);

/*Shuffle Function
 *Get Random Number between 0 and length
 *Swap card in random number and position and card in last position
 */
 
//Shuffle Deck Labels
function shuffle() {
	arrange();
	// console.log("Shuffle function started.")
	
	for (i = 0 ; i < 52; i++) {

		let max = deck.length-1,
			min = 0,
			lastCard = deck[max];

		var cardPos = randomize(min, max);
		
		deck[max] = deck[cardPos]
		deck[cardPos] = lastCard;
		
		shuffledDeck.push(deck.pop());

		if (deck.length == 0) {
			break;
		}
	}
}

//Shuffle Deck Numbers
function shuffleNum() {
	// console.log("Shuffle function started.")
	
	arrange();
	reset();
	
	for (i = 0 ; i < 52; i++) {

		let max = deckNum.length-1,
			min = 0,
			lastCard = deckNum[max];
		
		var cardPos = randomize(min, max);
		
		deckNum[max] = deckNum[cardPos]
		deckNum[cardPos] = lastCard;
		
		shuffledDeckNum.push(deckNum.pop());

		if (deck.length == 0) {
			break;
		}
	}
}

// Draw Card
function drawCard() {	
	var drawnCard = shuffledDeck.pop();
	graveyardDeck.push(drawnCard);
	document.getElementById("display").innerHTML = drawnCard;
}

function drawCardNum() {
	var drawnCard = shuffledDeckNum.pop(),
		displayCard = [];
	
	graveyardDeck.push(drawnCard);
	
	var drawnCardDisplay = cardFace[drawnCard[1]] + " " + suitName[drawnCard[0]];
	// console.log(drawnCardDisplay);
	
	if (drawnCard[0] > 1) {
		document.getElementById("display").style.color = "red";
	} else {
		document.getElementById("display").style.color = "black";
	}
	
	document.getElementById("display").innerHTML = drawnCardDisplay;
	
	pile -= 1;
	grave += 1;
			
	document.getElementById("pilecount").innerHTML = pile;
	document.getElementById("gravecount").innerHTML = grave;
	
	// Winner
	if (drawnCard[1] == matcher) {
		document.getElementById("winner").style.visibility = "visible"
		document.getElementById("winner").innerHTML = "WINNER!"
		document.getElementById("drawer").disabled = true;
		document.body.style.backgroundColor = "green";
	}
	
	// Disable draw
	if (pile == 0) {
		document.getElementById("drawer").disabled = true;
	}
}


function clickKing(){
	shuffleNum();
	document.getElementById("instructions").innerHTML = "First to draw a King wins";	
	return matcher = 12;
}

function clickQueen(){	
	shuffleNum();
	document.getElementById("instructions").innerHTML = "First to draw a Queen wins";	
	return matcher = 11;
}
function clickJack(){
	shuffleNum();
	document.getElementById("instructions").innerHTML = "First to draw a Jack wins";	
	return matcher = 10;
}


/* Other functions */

function gameReady() {
	document.getElementById("display").innerHTML = "Start";
	document.getElementById("instructions").style.visibility = "visible";
	document.body.style.backgroundColor = "#F1F7AD";
	document.getElementById("drawer").disabled = false;
}


// Random number between min and max inclusive
function randomize(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Reset

function reset () {

	pile = deckNum.length;
	grave = graveyardDeck.length;
	
	document.getElementById("pilecount").innerHTML = deckNum.length;
	document.getElementById("gravecount").innerHTML = graveyardDeck.length;	

	document.getElementById("winner").style.visibility = "hidden";
	document.body.style.backgroundColor = "#F1F7AD";
	
}
