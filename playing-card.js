class PlayingCard extends HTMLElement {
    connectedCallback() {
        // Get attributes
        const name = this.getAttribute("suit") || "placeholder";
        const number = this.getAttribute("number") || "0";
        const imageSrc = this.getAttribute("image") || "placeholder.jpg";
        this.innerHTML = `
            <section class="project-card">
                <h2>${number}${suit}</h2>
                <img src="${imageSrc}" alt="Screenshot of ${name}" width="200" height= "150">
            </section>    
        `;
    }
}

// Define the custom element
customElements.define("playing-card", PlayingCard);