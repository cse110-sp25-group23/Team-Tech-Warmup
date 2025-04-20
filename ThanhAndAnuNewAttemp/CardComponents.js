class PlayingCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.classList.add("card");
        wrapper.textContent = "🂠"; // Unicode card back

        const style = document.createElement("style");
        style.textContent = `
      .card {
        width: 180px;
        height: 260px;
        font-size: 200px;
        text-align: center;
        line-height: 260px;
        color: white;
        background-color: #007bff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        border: 3px solid #ffffff;
        user-select: none;
        font-family: "Segoe UI Symbol", "Arial Unicode MS", sans-serif;
      }
      .shuffling {
        animation: shuffle 0.6s ease-in-out;
      }
      @keyframes shuffle {
        0%   { transform: translateX(0); }
        25%  { transform: translateX(-30px) rotate(-8deg); }
        50%  { transform: translateX(30px) rotate(8deg); }
        75%  { transform: translateX(-15px) rotate(-4deg); }
        100% { transform: translateX(0); }
      }
    `;

        shadow.append(style, wrapper);
    }

    shuffle() {
        const card = this.shadowRoot.querySelector(".card");
        card.classList.add("shuffling");
        setTimeout(() => card.classList.remove("shuffling"), 600);
    }
}

customElements.define("playing-card", PlayingCard);
