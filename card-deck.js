/**
 * card suits and values
 */
const suits = ["Diamond", "Spade", "Club", "Heart"];
const card_values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A",]; 

class CardDeck extends HTMLElement {
    connectedCallback() {
        // Get attributes
        // const name = this.getAttribute("name") || "Card Deck"; //is this needed?
        const imageSrc = this.getAttribute("image") || "placeholder.jpg"; //picture of back of card or of facedown stack 
        this.innerHTML = `
            <section class="deck">
                <h2>Card Deck</h2>
                <div class="cards">
                </div>
            </section> 
        `;

        const cardContainer = this.querySelector(".cards");

        for (let i = 0; i < suits.length; ++i) {
            for(let j = 0; j < card_values.length; ++j) {
                const cardElement = document.createElement("playing-card");
                cardElement.setAttribute("suit", suits[i]);
                cardElement.setAttribute("number", card_values[j]);
                cardContainer.appendChild(cardElement);
                /*
                //Construct an image URL based on the card (adjust for your asset path)
                const imgName = `${card.Value}_of_${card.Suit}s`.toLowerCase().replace(/ /g, "_");
                const imgPath = `images/${imgName}.png`; // e.g., images/a_of_spades.png
                cardElement.setAttribute("image", imgPath);
                */
            }
        }

    }
}

// Define the custom element
customElements.define("card-deck", CardDeck);