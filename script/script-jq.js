const ANIMALS = ['cat', 'dog', 'hippo', 'horse', 'dove', 'fish', 'frog', 'spider'];
const FOOD = ['apple-alt', 'candy-cane', 'carrot', 'cheese', 'pizza-slice', 'hotdog', 'ice-cream', 'hamburger'];
const VEHICLES = ['bicycle', 'car', 'helicopter', 'motorcycle', 'plane', 'rocket', 'ship', 'truck-monster'];
const SPORTS = ['running', 'table-tennis', 'football-ball', 'basketball-ball', 'futbol', 'skating', 'biking', 'swimmer'];
const SETTINGS = {
	'CHOICES': ['animals', 'food', 'vehicles', 'sports'],
	'ICONS': SPORTS
};

const CARDS_NUMBER = 16;
const $board = $('#game-cards');

function createChoiceButtons() {
	const iconSetsNames =SETTINGS.CHOICES;
	iconSetsNames.forEach(iconSetName => {
		const iconSet = eval(iconSetName.toUpperCase());
		const $btn = $('<button>').text(iconSetName).append($('<br>'));
		for (let i=0; i < 3; i++) {
			$('<i>').addClass('fas').addClass(`fa-${iconSet[i]}`).appendTo($btn);
		}
		$('#choiceBtns').append($btn);
		$btn.on('click', function() {
			chooseIcons(iconSet);
			display('game');
			gameStart();
		})
	})
}

function display(box) {
	$('.display').hide();
	$(`.display.${box}`).show();
}

function chooseIcons(icons) {
	SETTINGS.ICONS = icons;
}

function gameStart() {
	$board.empty();
	createCards();
	shuffleCards();

	$('.card').on('click', function() {
		flipCard($(this));
		checkForMatch();
	})
}

function createCards(icons) {
	for (let i=0; i < CARDS_NUMBER; i++) {
		const icon = SETTINGS.ICONS[i%8];
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
	$('#win-message').show();
	setTimeout(function() {
		display('choice');
	}, 1000);
}


$(document).ready(function(){
	if(localStorage.getItem('darkModeStatus') == "true") {
		$('body').addClass('dark');
		$('#theme').prop('checked', 'checked');
	}
	createChoiceButtons();
	$('#win-message').hide();
	display('choice');
});

$('#playBtn').on('click', gameStart);
$('#choiceBtn').on('click', function() {
	$('#win-message').hide();
	display('choice');
});


$('#theme').on('change', function() {
	$('body').toggleClass('dark');
	localStorage.setItem('darkModeStatus', $('#theme').prop('checked'));
});