//transforming the HTML collection into an array
cards = Array.from(document.getElementsByClassName("card"));

//creating events when clicking cards
cards.forEach(card => card.addEventListener("click", function() {
	card.classList.add("flipped");
	setTimeout(function() { //unflip after a delay
		card.classList.remove("flipped");
	}, 2000);
}, false));