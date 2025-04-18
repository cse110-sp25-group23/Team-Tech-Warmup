/**
 * card suits and values
 */
const suits = ["Diamond", "Spade", "Club", "Heart"];
const card_values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A",];

/**
 * function: initializes deck 
 * iterate through both the suits and card values to create a card component
 * after creating the card, add it to the deck
 * @returns deck 
 */
function create_deck() {
    let deck = [];
    for (let i = 0; i < suits.length; ++i) {
        for(let j = 0; j < card_values.length; ++j) {
            let card = {"Suit": suits[i], "Value": card_values[j]};
            deck.push(card);
        }
    }
    return deck;

}

/**
 * check code correctness
 */
const deck = create_deck();
console.log(deck);
console.log(deck.length);   