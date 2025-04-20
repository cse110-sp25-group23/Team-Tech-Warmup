// deck.js
import { suits, cards } from "./state.js";

export function createDeck(numDecks = 1) {
  const deck = [];
  for (let i = 0; i < numDecks; i++) {
    for (let suit of suits) {
      for (let value of cards) {
        deck.push({ value, suit });
      }
    }
  }
  return shuffleDeck(deck);
}

function shuffleDeck(deck) {
  for (let i = 0; i < 1000; i++) {
    const a = Math.floor(Math.random() * deck.length);
    const b = Math.floor(Math.random() * deck.length);
    [deck[a], deck[b]] = [deck[b], deck[a]];
  }
  return deck;
}
