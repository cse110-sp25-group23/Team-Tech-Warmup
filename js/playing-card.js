class PlayingCard extends HTMLElement {
    static get observedAttributes() {
      return ['rank', 'suit', 'flipped'];
    }
  
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const wrapper = document.createElement('div');
      wrapper.className = 'card';
  
      const style = document.createElement('style');
      style.textContent = `
        .card {
            background-color: white;
            color: black;
            padding: 0px 50px;
            /* Bigger padding for chunkier card */
            border-radius: 15px;
            display: inline-block;
            font-family: "Segoe UI Symbol", "Symbola", serif;
            font-size: 15rem;
            /* BIIIIIG Unicode card symbol */
            margin: 15px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
            animation: slideIn 0.4s ease;
            transition: transform 0.2s ease;
        }

        .card:hover {
            transform: scale(1.05);
        }   
      `;
  
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
    }
  
    attributeChangedCallback() {
      this.render();
    }
  
    render() {
      const wrapper = this.shadowRoot.querySelector('.card');
      const rank = this.getAttribute('rank');
      const suit = this.getAttribute('suit');
      const flipped = this.hasAttribute('flipped');
  
      if (flipped) {
        wrapper.textContent = '🂠'; // back of card symbol
      } else {
        wrapper.textContent = this.cardSymbol(rank, suit);
      }
    }
  
    cardSymbol(rank, suit) {
      const suits = {
        '♠': 0x1F0A0,
        '♥': 0x1F0B0,
        '♦': 0x1F0C0,
        '♣': 0x1F0D0,
      };
      const rankCodes = {
        A: 1, 2: 2, 3: 3, 4: 4,
        5: 5, 6: 6, 7: 7, 8: 8,
        9: 9, 10: 10, J: 11, Q: 13, K: 14
      };
      const base = suits[suit];
      const code = base + rankCodes[rank];
      return String.fromCodePoint(code);
    }
  }
  
  customElements.define('playing-card', PlayingCard);
  