/** card suits and values */
const suits = ["Diamonds", "Spades", "Clubs", "Hearts"];
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
function shuffle(deck) {
    for(let i = deck.length - 1; i > 0; --i) {
        const index = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[index]] = [deck[index], deck[i]]
    }
    return deck;
}

/** shuffled deck */
const shuffled_deck = shuffle(deck);

/** check for correctness */
// console.log(shuffled_deck);
// console.log();

function drawCards(num, deck) {
    /** Tracks cards drawn */
    const drawn_cards = [];

    /** Deals the cards depending on inputted number */
    for(let i = 0; i < num; ++i) {
        if(deck.length === 0) {
            break;
        }
        /** Remove card from shuffled deck */
        const card = deck.pop();

        /** Append card into cards_drawn array*/
        drawn_cards.push(card);
    }
        /** Return one card or multiple cards */
        if(drawn_cards.length === 1){
            return drawn_cards[0];
        }
        else {
            return drawn_cards
        }
}


