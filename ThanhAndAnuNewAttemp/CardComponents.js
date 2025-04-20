class PlayingCard extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'hidden'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value' || name === 'hidden') {
            this.render();
        }
    }

    render() {
        const value = this.getAttribute("value") || "🂡";
        const isHidden = this.hasAttribute("hidden");

        const wrapper = document.createElement("div");
        wrapper.classList.add("card");
        wrapper.textContent = isHidden ? "🂠" : value;

        const style = document.createElement("style");
        style.textContent = `
      .card {
        width: 120px;
        height: 180px;
        font-size: 10rem;
        text-align: center;
        line-height: 180px;
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 6px 14px rgba(0,0,0,0.6);
        font-family: "Segoe UI Symbol", "Symbola", "Noto Color Emoji", sans-serif;
        cursor: pointer;
        transition: transform 0.3s ease;
      }

      .card:hover {
        transform: scale(1.05);
      }

      .shuffling {
        animation: shuffle 0.6s ease-in-out;
      }

      @keyframes shuffle {
        0%   { transform: translateX(0); }
        25%  { transform: translateX(-20px) rotate(-5deg); }
        50%  { transform: translateX(20px) rotate(5deg); }
        75%  { transform: translateX(-10px) rotate(-2deg); }
        100% { transform: translateX(0); }
      }
    `;

        wrapper.addEventListener("click", () => {
            if (isHidden) {
                this.removeAttribute("hidden");
            }
        });

        this.shadowRoot.innerHTML = "";
        this.shadowRoot.append(style, wrapper);
        this.cardEl = wrapper;
    }

    shuffle() {
        this.cardEl.classList.add("shuffling");
        setTimeout(() => this.cardEl.classList.remove("shuffling"), 600);
    }
}

customElements.define("playing-card", PlayingCard);
