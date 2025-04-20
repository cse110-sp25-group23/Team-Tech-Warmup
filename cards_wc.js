import { create_deck, shuffle, drawCards } from './cards_functions.js';

class PlayingCard extends HTMLElement {
    /*constructor(){
        super(); //inherits parent attributes?
    }*/
    connectedCallback() {
        // Get attributes
        const suit = this.getAttribute("suit") || "placeholder";
        const value = this.getAttribute("value") || "0";
        this.innerHTML = `
            <p>Playing Card: ${value} of ${suit}</p>
        `;
    }

   //add button to flip card animation??
}
customElements.define("playing-card", PlayingCard);



let deck = shuffle(create_deck());

function createPlayingCard(cardVals) {
    const newCard = document.createElement("playing-card");
    newCard.setAttribute("suit", cardVals.suit);
    newCard.setAttribute("value", cardVals.value);
    return newCard;
}

document.getElementById("newRound").addEventListener("click", () => {
    const playerCards = document.getElementById("playerCards");
    const dealerCards = document.getElementById("dealerCards");
    console.log("Dealing cards for new round");

    //clear cards
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';

    //add 2 player cards
    let cardVals = drawCards(1, deck);
    let newCard = createPlayingCard(cardVals);
    playerCards.appendChild(newCard);
    
    cardVals = drawCards(1, deck);
    newCard = createPlayingCard(cardVals);
    playerCards.appendChild(newCard);
    
    //add 2 dealer cards
    cardVals = drawCards(1, deck);
    newCard = createPlayingCard(cardVals);
    dealerCards.appendChild(newCard);
    
    cardVals = drawCards(1, deck);
    newCard = createPlayingCard(cardVals);
    dealerCards.appendChild(newCard);
});

document.getElementById("playerHit").addEventListener("click", () => {
    const playerCards = document.getElementById("playerCards");
    console.log("Player draws one card");

    const cardVals = drawCards(1, deck);
    const newCard = createPlayingCard(cardVals);
    playerCards.appendChild(newCard);
});

document.getElementById("dealerHit").addEventListener("click", () => {
    const dealerCards = document.getElementById("dealerCards");
    console.log("Dealer draws one card");
    
    const cardVals = drawCards(1, deck);
    const newCard = createPlayingCard(cardVals);
    dealerCards.appendChild(newCard);
});

class CardDeck extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="deck">
                <h2>Card Deck</h2>
                    <button name="shuffle">Shuffle Deck</button>
                    <br>
                    <img src="media/card_deck.jpg" alt="Top of facedown card deck" width="620" height="370">
                <div class="cards"></div>
            </section> 
        `;
    
        const shuffleButton = this.querySelector('button[name="shuffle"]');
        const deckImage = this.querySelector('img');

        shuffleButton.addEventListener('click', () => {
            console.log("shuffled deck");

            deckImage.src = "https://miro.medium.com/v2/resize:fit:828/format:webp/1*3l1h9uWiNRggMXH-ibcVVA.gif";

            setTimeout(() => { //reset to original image after gif is done
                deckImage.src = "media/card_deck.jpg";
            }, 2000);
        });
    }
}

// Define the custom element
customElements.define("card-deck", CardDeck);
