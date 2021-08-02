var pairLeft;

function gameInit() {
	pairLeft = 8;
	shuffle();
}

function shuffle() {
	let listPos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
	listPos = listPos.sort(() => Math.random() - 0.5);
	for (i = 0; i < listPos.length; i++) {
		cards[i].style.order = listPos[i];
	}
}

//transforming the HTML collection into an array
cards = Array.from(document.getElementsByClassName("card"));

//creating events when clicking cards
cards.forEach(card => card.addEventListener("click", function() {
	card.classList.add("flipped");
	setTimeout(function() { //unflip after a delay
		card.classList.remove("flipped");
	}, 2000);
}, false));