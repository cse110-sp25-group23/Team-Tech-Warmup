
// class PlayingCard extends HTMLElement {
//     constructor() {
//         //this method works with extends HTMLElement to inherits its methods
//         super();
//         /* now when we use <playing-card> in HTML, 
//         it renders independently without interfering with global styles
//         .when you use <playing-card> in your HTML, it renders independently 
//         without interfering with global styles*/
//         this.attachShadow({ mode: "open" }); 
//         //everything inside of here will only affect this component
//         // card's value are dynamically pulled using these .get methods
//         this.shadowRoot.innerHTML = 
//             `<style>
//                 .card { width: 100px; height: 150px; border: 1px solid black; }
//             </style> 
//             <div class="card">${this.getAttribute("value")} of ${this.getAttribute("suit")}</div>`;
//     }
// }



// customElements.define("playing-card", PlayingCard);


//defines the number/ letters for the cards
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//defines the different suits a card can have
var suits = ["diamonds", "hearts", "spades", "clubs"];

var deck = new Array();

function getDeck() {
//create a deck of cards
    var deck = new Array();

//create cards such that each suit has a card with each number/letter
    for(var i = 0; i < suits.length; i++) {
        for(var x = 0; x < cards.length; x++) {
            var card = {Value: cards[x], Suit: suits[i]};
            //push card to deck
            deck.push(card);
        }
    }

    return deck;
}
/* Shuffle randomizer */
function shuffle() {
    // repeat shuffle 1000 times
    for (var i = 0; i < 1000; i++) {
        //pick two random positions in the size of deck (52)
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        //swap two cards
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }

    renderDeck();
}
/* This puts the number and symbol (heart, spade, etc) onto the cards we made */
function renderDeck() {
    document.getElementById('deck').innerHTML = '';

    for(var i = 0; i < deck.length; i++) {
        var scene = document.createElement("div");
        scene.classList.add('scene');
                
        var card = document.createElement("div");
        card.classList.add('card');
        card.classList.add(deck[i].Suit);
        
        //get icon for corresponding suit
        var icon = '';
        if (deck[i].Suit == 'hearts')
            icon = '♥';
        else if (deck[i].Suit == 'spades')
            icon = '♠';
        else if (deck[i].Suit == 'diamonds')
            icon = '♦';
        else
            icon = '♣';

        //create the front of the card witht the suit and number
        var front = document.createElement("div");
        front.classList.add('card-front');
        front.innerHTML = deck[i].Value + ' ' + icon;
                
        var back = document.createElement("div");
        back.classList.add('card-back');
                
        card.appendChild(front);
        card.appendChild(back);
        scene.appendChild(card);
        document.getElementById("deck").appendChild(scene);

        card.setAttribute("draggable", "true");
        card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(deck[i]));
});

        
        //listen for click and flip card
        card.addEventListener('click', function() {
            this.classList.toggle('is-flipped');
        });
    }
}
/* This puts the card designs onto the site */
function load() {
    deck = getDeck();
    shuffle();
    renderDeck();
}

window.addEventListener('load', load);