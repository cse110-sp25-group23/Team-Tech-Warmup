// gameLogic.js
import { cardValues } from "./state.js";

export function calculateHandValue(hand) {
  let total = 0, aces = 0;
  for (const card of hand) {
    total += cardValues[card.value];
    if (card.value === "A") aces++;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}
