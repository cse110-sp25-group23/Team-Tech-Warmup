const deck = [];
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

for (const suit of suits) {
  for (const rank of ranks) {
    let value = parseInt(rank);
    if (rank === 'A') value = 11;
    else if (['J', 'Q', 'K'].includes(rank)) value = 10;
    deck.push({ rank, suit, value });
  }
}

let money = 1000;
const moneyDisplay = document.getElementById('money');
const betInput = document.getElementById('bet');
const dealerHand = document.getElementById('dealer-hand');
const playerHand = document.getElementById('player-hand');
const resetBtn = document.getElementById('reset');
const hitBtn = document.getElementById('hit');
const standBtn = document.getElementById('stand');

const dealerScoreDisplay = document.getElementById('dealer-score');
const playerScoreDisplay = document.getElementById('player-score');


function getRandomCard() {
  return deck[Math.floor(Math.random() * deck.length)];
}

function createCard(card, flipped = false) {
  const el = document.createElement('playing-card');
  el.setAttribute('rank', card.rank);
  el.setAttribute('suit', card.suit);
  el.dataset.value = card.value;
  if (card.rank === 'A') el.dataset.ace = 'true';
  if (flipped) el.setAttribute('flipped', '');
  return el;
}


function calculateScore(cards) {
  let score = 0;
  let aces = 0;
  for (const card of cards) {
    score += parseInt(card.dataset.value);
    if (card.dataset.ace) aces++;
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

function resetGame() {
  playerHand.innerHTML = '';
  dealerHand.innerHTML = '';
  hitBtn.disabled = false;
  standBtn.disabled = false;

  const playerCards = [getRandomCard(), getRandomCard()];
  const dealerCards = [getRandomCard(), getRandomCard()];

  playerCards.forEach(c => playerHand.appendChild(createCard(c)));

  dealerHand.appendChild(createCard(dealerCards[0], true)); // show flipped
  dealerHand.appendChild(createCard(dealerCards[1]));
  
  updateScores();
}


function endGame(message) {
  alert(message);
  const bet = parseInt(betInput.value) || 0;
  if (message.includes('win')) money += bet;
  else if (message.includes('lose') || message.includes('busted')) money -= bet;
  moneyDisplay.textContent = money;
  if (money <= 0) {
    alert("You're out of money!");
    hitBtn.disabled = true;
    standBtn.disabled = true;
  }
}

function updateScores() {
  // Player score is always shown
  const playerScore = calculateScore(playerHand.children);
  playerScoreDisplay.textContent = `Total: ${playerScore}`;

  // Dealer: check if there's a hidden card
  const dealerCards = Array.from(dealerHand.children);
  const hasFlipped = dealerCards.some(card => card.hasAttribute('flipped'));

  if (hasFlipped) {
    // Show only visible dealer cards
    const visible = dealerCards.filter(card => !card.hasAttribute('flipped'));
    const partialScore = calculateScore(visible);
    dealerScoreDisplay.textContent = `Total: ${partialScore}`;
  } else {
    // Reveal full dealer score
    const dealerScore = calculateScore(dealerCards);
    dealerScoreDisplay.textContent = `Total: ${dealerScore}`;
  }
}


hitBtn.addEventListener('click', () => {
  const card = getRandomCard();
  playerHand.appendChild(createCard(card));

  const score = calculateScore(playerHand.children);
  if (score > 21) {
    hitBtn.disabled = true;
    standBtn.disabled = true;
    endGame("You busted! You lose.");
  }
  updateScores();
});

standBtn.addEventListener('click', () => {
  // Reveal dealer's flipped card
  const flippedCard = dealerHand.querySelector('[flipped]');
  if (flippedCard) flippedCard.removeAttribute('flipped');

  // Dealer draws until 17+
  while (calculateScore(dealerHand.children) < 17) {
    const card = getRandomCard();
    dealerHand.appendChild(createCard(card));
  }

  hitBtn.disabled = true;
  standBtn.disabled = true;

  const playerScore = calculateScore(playerHand.children);
  const dealerScore = calculateScore(dealerHand.children);

  if (dealerScore > 21) endGame("Dealer busted! You win!");
  else if (playerScore > dealerScore) endGame("You win!");
  else if (playerScore < dealerScore) endGame("You lose.");
  else endGame("It's a tie!");

  updateScores();
});


resetBtn.addEventListener('click', resetGame);
window.addEventListener('DOMContentLoaded', resetGame);
