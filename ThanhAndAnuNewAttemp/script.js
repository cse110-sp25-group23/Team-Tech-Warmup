const playerCardRow = document.getElementById('player-cards');
const dealerCardRow = document.getElementById('dealer-cards');
const hitButton = document.getElementById('hit-button');
const resetButton = document.getElementById('reset-button');
const standButton = document.getElementById('stand-button');
const shuffleButton = document.getElementById('shuffle-button');
let money = 1000;
const moneyDisplay = document.getElementById('money');
const betInput = document.getElementById('bet');

const deck = [
    { rank: 'A', symbol: '🂡', value: 11 },
    { rank: '2', symbol: '🂢', value: 2 },
    { rank: '3', symbol: '🂣', value: 3 },
    { rank: '4', symbol: '🂤', value: 4 },
    { rank: '5', symbol: '🂥', value: 5 },
    { rank: '6', symbol: '🂦', value: 6 },
    { rank: '7', symbol: '🂧', value: 7 },
    { rank: '8', symbol: '🂨', value: 8 },
    { rank: '9', symbol: '🂩', value: 9 },
    { rank: '10', symbol: '🂪', value: 10 },
    { rank: 'J', symbol: '🂫', value: 10 },
    { rank: 'Q', symbol: '🂭', value: 10 },
    { rank: 'K', symbol: '🂮', value: 10 }
];

function getRandomCard() {
    const index = Math.floor(Math.random() * deck.length);
    return deck[index];
}

function createCardElement(card, hidden = false) {
    const cardEl = document.createElement('playing-card');
    cardEl.setAttribute('value', card.symbol);
    cardEl.dataset.rank = card.rank;
    cardEl.dataset.value = card.value;
    if (hidden) cardEl.setAttribute('hidden', '');
    return cardEl;
}

function calculateScore(cardEls) {
    let total = 0;
    let aces = 0;
    for (let el of cardEls) {
        const val = parseInt(el.dataset.value);
        if (el.dataset.rank === 'A') aces++;
        total += val;
    }
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }
    return total;
}

function resetGame() {
    playerCardRow.innerHTML = '';
    dealerCardRow.innerHTML = '';

    for (let i = 0; i < 2; i++) {
        const card = getRandomCard();
        playerCardRow.appendChild(createCardElement(card));
    }

    const hiddenCard = getRandomCard();
    const shownCard = getRandomCard();
    dealerCardRow.appendChild(createCardElement(hiddenCard, true));
    dealerCardRow.appendChild(createCardElement(shownCard));
}

hitButton.addEventListener('click', () => {
    const card = getRandomCard();
    playerCardRow.appendChild(createCardElement(card));
});

standButton.addEventListener('click', () => {
    const hidden = dealerCardRow.querySelector('playing-card[hidden]');
    if (hidden) hidden.flip();

    while (calculateScore(dealerCardRow.children) < 17) {
        dealerCardRow.appendChild(createCardElement(getRandomCard()));
    }

    const playerScore = calculateScore(playerCardRow.children);
    const dealerScore = calculateScore(dealerCardRow.children);
    const bet = parseInt(betInput.value) || 0;

    setTimeout(() => {
        if (playerScore > 21) {
            alert("You busted! Dealer wins.");
            money -= bet;
        } else if (dealerScore > 21) {
            alert("Dealer busted! You win!");
            money += bet;
        } else if (playerScore > dealerScore) {
            alert("You win!");
            money += bet;
        } else if (playerScore < dealerScore) {
            alert("Dealer wins.");
            money -= bet;
        } else {
            alert("It's a tie!");
        }

        moneyDisplay.textContent = money;

        if (money <= 0) {
            alert("You're broke! Game over.");
            hitButton.disabled = true;
            standButton.disabled = true;
        }
    }, 400);
});

resetButton.addEventListener('click', () => {
    hitButton.disabled = false;
    standButton.disabled = false;
    resetGame();
});

shuffleButton.addEventListener('click', () => {
    const topCard = document.querySelector('#deck playing-card');
    if (topCard) topCard.shuffle();
});

resetGame();
