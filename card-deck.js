

class PlayingCard extends HTMLElement {
    constructor(){
        super();
    }
    /*connectedCallback() {
        // Get attributes
        const suit = this.getAttribute("suit") || "placeholder";
        const number = this.getAttribute("number") || "0";
        //const imageSrc = this.getAttribute("image") || "placeholder.jpg";
        this.innerHTML = `
            <h2>${number}${suit}</h2>
            <!--<img src="${imageSrc}" alt="Screenshot of ${name}" width="200" height= "150">-->
        `;
    }*/
}

// Define the custom element
customElements.define("playing-card", PlayingCard);

class CardDeck extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="deck">
                <h2>Card Deck</h2>
                    <button name="shuffle">Shuffle Deck</button>
                    <img src="card_deck.jpg" alt="Top of facedown card deck" width="620" height="370">
                <div class="cards"></div>
            </section> 
        `;

        const cardContainer = this.querySelector(".cards");

        const suits = ["Diamond", "Spade", "Club", "Heart"];
        const card_values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A",]; 

        for (let i = 0; i < suits.length; ++i) {
            for(let j = 0; j < card_values.length; ++j) {
                const cardElement = document.createElement("playing-card");
                cardElement.setAttribute("suit", suits[i]);
                cardElement.setAttribute("number", card_values[j]);
                cardContainer.appendChild(cardElement); //this
                /*
                //Construct an image URL based on the card (adjust for your asset path)
                const imgName = `${card.Value}_of_${card.Suit}s`.toLowerCase().replace(/ /g, "_");
                const imgPath = `images/${imgName}.png`; // e.g., images/a_of_spades.png
                cardElement.setAttribute("image", imgPath);
                */
            }
        }
    
        const shuffleButton = this.querySelector('button[name="shuffle"]');
        const deckImage = this.querySelector('img');

        shuffleButton.addEventListener('click', () => {
            console.log("shuffled deck");

            deckImage.src = "https://miro.medium.com/v2/resize:fit:828/format:webp/1*3l1h9uWiNRggMXH-ibcVVA.gif";

            setTimeout(() => { //reset to original image after gif is done
                deckImage.src = "card_deck.jpg";
            }, 2000);
        });

    }

}

// Define the custom element
customElements.define("card-deck", CardDeck);