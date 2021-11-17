const ANIMALS = ['cat', 'dog', 'hippo', 'horse', 'dove', 'fish', 'frog', 'spider'];
const FOOD = ['apple-alt', 'candy-cane', 'carrot', 'cheese', 'pizza-slice', 'hotdog', 'ice-cream', 'hamburger'];
const CARDS_NUMBER = 16;

const $board = $('#game-cards');

function gameStart() {
	$board.empty();
	createCards();
	shuffleCards();

	$('.card').on('click', function() {
		flipCard($(this));
		checkForMatch();
	})
}

function createCards() {
	for (let i=0; i < CARDS_NUMBER; i++) {
		const icon = FOOD[i%8];
		const $card = $('<div>')
			.attr('data-icon', icon)
			.addClass('card')
			.addClass('toShuffle')
			.html(`
				<div class="card-inner">
					<div class="card-front"></div>
					<div class="card-back">
						<i class="fas fa-${icon}"></i>
					</div>
				</div>
			`);
		$board.append($card);
	}
}

function shuffleCards() {
	for (let i = 1; i <= 16; i++) {
		const randomCardIndex = Math.floor(Math.random() * $('.toShuffle').length);
		$('.toShuffle').eq(randomCardIndex)
			.css('order', i)
			.removeClass('toShuffle');
	}
}

function flipCard($card) {
	$card.toggleClass('flipped');
}

function checkForMatch() {
	const $cardsToCheck = $('.flipped').not('.found');
	if ($cardsToCheck.length != 2) return;

	if($cardsToCheck.eq(0).data('icon') === $cardsToCheck.eq(1).data('icon')) {
		$cardsToCheck.addClass('found');
		if ($('.found').length == CARDS_NUMBER) gameOver();
		return;
	}

	$board.addClass('locked');
	setTimeout(function() {
		$cardsToCheck.each(function() {
			flipCard($(this))
			$board.removeClass('locked');
		})
	}, 1000);

}

function gameOver() {
	setTimeout(gameStart, 1000);
}

$('#play').on('click', gameStart);

$('#theme').on('change', function() {
	$('body').toggleClass('dark');
	localStorage.setItem('darkModeStatus', $('#theme').prop('checked'));
});

$(document).ready(function(){
	if(localStorage.getItem('darkModeStatus') == "true") {
		$('body').addClass('dark');
		$('#theme').prop('checked', 'checked');
	}
	gameStart();
});
