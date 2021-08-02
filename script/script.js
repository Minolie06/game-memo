var pairLeft;
var lockBoard;
var firstCard, secondCard;

var gameCards = document.getElementById("game-cards");
//transforming the HTML collection into an array
cards = Array.from(document.getElementsByClassName("card"));

function gameInit() {
	pairLeft = 8;
	//reset timer and score here + unflip cards etc
	unflipCards();
	setTimeout(function() { //shuffle after animation
			resetBoard();
			shuffle();
		}, 1000);
	
}

function unflipCards() {
	gameCards.classList.add("locked");
	for (i = 0; i < cards.length; i++) {
		cards[i].classList.remove("flipped");
	}	
}

function shuffle() {
	let listPos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
	listPos = listPos.sort(() => Math.random() - 0.5);
	for (i = 0; i < listPos.length; i++) {
		cards[i].style.order = listPos[i];
	}
}

function flipCard(card) {
	card.classList.add("flipped");
	if (firstCard == null) {
		firstCard = card;
	} else {
		secondCard = card;
		checkForMatch();
	}
}

function checkForMatch(){
	if (firstCard.getAttribute("data") == secondCard.getAttribute("data")) {
		pairLeft -= 1;
		resetBoard();
		if (pairLeft == 0) {
			gameOver();
		}
	} else {
		gameCards.classList.add("locked");
		setTimeout(function() { //unflip after a delay
			firstCard.classList.remove("flipped");
			secondCard.classList.remove("flipped");
			resetBoard();
		}, 1000);
	}
}

function resetBoard() {
	gameCards.classList.remove("locked");
	[firstCard, secondCard] = [null, null];
}

function gameOver() {
	setTimeout(function() {
		gameInit()
	}, 1000);
}

//creating events when clicking cards
cards.forEach(card => card.addEventListener("click", function() {
	flipCard(card);	
}, false));

//controls events
document.getElementById("replay").addEventListener("click", gameOver);

window.onload = gameInit;