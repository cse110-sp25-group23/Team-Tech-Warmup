// state.js

// — Constants —
export const cards = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
export const suits = ["diamonds","hearts","spades","clubs"];

export const cardValues = {
  "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10,
  "J":10, "Q":10, "K":10, "A":11
};

// — Mutable State —
export let deck = [];
export let playerHand = [];
export let dealerHand = [];
export let dealerHiddenCard = null;

// We keep money & bet private and expose via accessors:
let money = 1000;
let bet = 50;

// — State Mutators / Accessors —
// Deck
export function setDeck(newDeck) {
  deck = newDeck;
}
export function getDeck() {
  return deck;
}

// Hands
export function resetHands() {
  playerHand.length = 0;
  dealerHand.length = 0;
  dealerHiddenCard = null;
}

// Money
export function setMoney(val) {
  money = val;
}
export function getMoney() {
  return money;
}

// Bet
export function setBet(val) {
  bet = val;
}
export function getBet() {
  return bet;
}
