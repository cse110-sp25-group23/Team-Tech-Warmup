// js/main.js
import { createDeck } from "./deck.js";
import { renderCard } from "./renderer.js";
import { calculateHandValue } from "./gameLogic.js";
import {
  playerHand,
  dealerHand,
  resetHands,
  setDeck,    
  getDeck,    
  getMoney,
  setMoney,
  getBet,
  setBet
} from "./state.js";


let hiddenCardDiv = null;

// ——— Helpers ———
function updateMoneyDisplay() {
  document.getElementById("money-display").textContent =
    `Money: $${getMoney()}`;
}

function toggleButtons(inRound) {
  document.getElementById("deal-btn").disabled  = inRound;
  document.getElementById("hit-btn").disabled   = !inRound;
  document.getElementById("stand-btn").disabled = !inRound;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dealCard(hand, container, faceUp = true) {
  const deckArr = getDeck();
  if (!Array.isArray(deckArr) || deckArr.length === 0) {
    console.error("⚠️ dealCard(): deck is empty or not an array!", deckArr);
  }
  const card = deckArr.pop();
  console.log("▶️ Dealing", card, "faceUp?", faceUp);
  hand.push(card);
  const scene = renderCard(card, faceUp);
  container.appendChild(scene);
  return scene;
}

// ——— Game Flow ———
function startGame() {
  console.log("🏁 startGame()");
  const rawBet = document.getElementById("bet").value;
  console.log("   • raw bet input:", rawBet);
  const userBet = parseInt(rawBet, 10);
  if (isNaN(userBet) || userBet <= 0 || userBet > getMoney()) {
    alert("Invalid bet.");
    return;
  }

  setBet(userBet);
  resetHands();
  setDeck(createDeck());
  console.log("   • New deck size:", getDeck().length);

  // clear out any old cards
  document.getElementById("player-hand").innerHTML = "";
  document.getElementById("dealer-hand").innerHTML = "";
  document.getElementById("game-message").textContent = "";

  // deal!
  dealCard(playerHand, document.getElementById("player-hand"), true);
  dealCard(playerHand, document.getElementById("player-hand"), true);

  const hiddenScene = dealCard(
    dealerHand,
    document.getElementById("dealer-hand"),
    false
  );
  hiddenCardDiv = hiddenScene.querySelector(".card");

  dealCard(dealerHand, document.getElementById("dealer-hand"), true);

  toggleButtons(true);
  updateMoneyDisplay();
}

function playerHit() {
  console.log("🤚 playerHit()");
  dealCard(playerHand, document.getElementById("player-hand"), true);
  if (calculateHandValue(playerHand) > 21) {
    endGame("Bust! You lose.", false);
  }
}

async function playerStand() {
  console.log("✋ playerStand()");
  if (hiddenCardDiv) {
    hiddenCardDiv.classList.add("is-flipped");
    hiddenCardDiv = null;
  }

  let dealerTotal = calculateHandValue(dealerHand);
  while (dealerTotal < 17) {
    await sleep(500);
    dealCard(dealerHand, document.getElementById("dealer-hand"), true);
    dealerTotal = calculateHandValue(dealerHand);
  }

  const playerTotal = calculateHandValue(playerHand);
  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    endGame("You win!", true);
  } else if (dealerTotal === playerTotal) {
    endGame("Push! It's a tie.", null);
  } else {
    endGame("Dealer wins!", false);
  }
}

function endGame(message, playerWins) {
  console.log("🏁 endGame():", message, playerWins);
  document.getElementById("game-message").textContent = message;

  const cm = getMoney(), cb = getBet();
  if (playerWins === true)  setMoney(cm + cb);
  else if (playerWins === false) setMoney(cm - cb);

  updateMoneyDisplay();
  toggleButtons(false);
}

function resetGame() {
  console.log("🔄 resetGame()");
  setMoney(1000);
  updateMoneyDisplay();
  resetHands();
  document.getElementById("player-hand").innerHTML    = "";
  document.getElementById("dealer-hand").innerHTML    = "";
  document.getElementById("game-message").textContent = "";
  toggleButtons(false);
}

// ——— Initialization ———
document.addEventListener("DOMContentLoaded", () => {
  console.log("📦 DOMContentLoaded – wiring up buttons");
  updateMoneyDisplay();

  const dealBtn  = document.getElementById("deal-btn");
  const hitBtn   = document.getElementById("hit-btn");
  const standBtn = document.getElementById("stand-btn");
  const resetBtn = document.getElementById("reset-btn");
  console.log({ dealBtn, hitBtn, standBtn, resetBtn });

  dealBtn.addEventListener("click",  startGame);
  hitBtn.addEventListener("click",   playerHit);
  standBtn.addEventListener("click", playerStand);
  resetBtn.addEventListener("click", resetGame);
});
