/** card suits and values */
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

/** initialize deck */
const deck = create_deck();

/** check code correctness */
// console.log(deck);
// console.log(deck.length);   

/**
 * function: shuffles deck
 * iterates through deck in a decreasing manner and randomizes each index 
 * in order to imitate a shuffle 
 * @returns shuffled deck
 */
function shuffle() {
    for(let i = deck.length; i > 0; --i) {
        const index = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[index]] = [deck[index], deck[i]]
    }
    return deck;
}

/** shuffled deck */
const shuffled_deck = shuffle(deck);

/** check for correctness */
console.log(shuffled_deck);
console.log();

