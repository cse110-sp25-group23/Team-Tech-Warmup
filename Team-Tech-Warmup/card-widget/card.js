class PlayingCard extends HTMLElement {
    constructor() {
        //this method works with extends HTMLElement to inherits its methods
        super();
        /* now when we use <playing-card> in HTML, 
        it renders independently without interfering with global styles
        .when you use <playing-card> in your HTML, it renders independently 
        without interfering with global styles*/
        this.attachShadow({ mode: "open" }); 
        //everything inside of here will only affect this component
        // card's value are dynamically pulled using these .get methods
        this.shadowRoot.innerHTML = 
            `<style>
                .card { width: 100px; height: 150px; border: 1px solid black; }
            </style> 
            <div class="card">${this.getAttribute("value")} of ${this.getAttribute("suit")}</div>`;
    }
}
customElements.define("playing-card", PlayingCard);