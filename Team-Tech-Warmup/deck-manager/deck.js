// deck.js
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];

function getSuitIcon(suit) {
    switch (suit) {
        case "hearts": return "♥";
        case "spades": return "♠";
        case "diamonds": return "♦";
        case "clubs": return "♣";
        default: return "";
    }
}

function renderFullDeck() {
    const display = document.getElementById("deck");
    display.innerHTML = "";

    for (let suit of suits) {
        const suitRow = document.createElement("div");
        suitRow.classList.add("suit-row");
        suitRow.dataset.suit = suit;

        for (let value of cards) {
            const scene = document.createElement("div");
            scene.classList.add("scene");
            scene.dataset.suit = suit;
            scene.dataset.value = value;

            const card = document.createElement("div");
            card.classList.add("card", suit);

            const front = document.createElement("div");
            front.classList.add("card-front");
            front.innerHTML = value + " " + getSuitIcon(suit);

            const back = document.createElement("div");
            back.classList.add("card-back");

            card.appendChild(front);
            card.appendChild(back);

            card.addEventListener("click", () => {
                card.setAttribute("draggable", "true");
                card.classList.add("draggable");

                card.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/plain", scene.outerHTML);
                    setTimeout(() => {
                        scene.remove();
                    }, 0);
                });
            });

            scene.appendChild(card);
            suitRow.appendChild(scene);
        }

        display.appendChild(suitRow);
    }

    setupDropZone();
}

function setupDropZone() {
    const dropZone = document.getElementById("my-deck");
    const fullDeck = document.getElementById("deck");

    // Drop into player deck
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "lightgreen";
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.style.borderColor = "white";
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "white";

        const data = e.dataTransfer.getData("text/plain");
        dropZone.insertAdjacentHTML("beforeend", data);

        const scene = dropZone.lastElementChild;
        const card = scene.querySelector(".card");

        card.setAttribute("draggable", "true");
        card.classList.add("draggable");

        card.addEventListener("click", () => {
            card.classList.toggle("is-flipped");
        });

        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", scene.outerHTML);
            setTimeout(() => {
                scene.remove();
            }, 0);
        });
    });

    // Drop back into full deck
    fullDeck.addEventListener("dragover", (e) => {
        e.preventDefault();
        fullDeck.style.borderColor = "lightblue";
    });

    fullDeck.addEventListener("dragleave", () => {
        fullDeck.style.borderColor = "white";
    });

    fullDeck.addEventListener("drop", (e) => {
        e.preventDefault();
        fullDeck.style.borderColor = "white";

        const data = e.dataTransfer.getData("text/plain");

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const newScene = doc.body.firstElementChild;

        const suit = newScene.dataset.suit;
        const value = newScene.dataset.value;

        // Find correct row
        const suitRow = fullDeck.querySelector(`.suit-row[data-suit="${suit}"]`);
        if (!suitRow) return;

        const cardOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const newValueIndex = cardOrder.indexOf(value);

        // Insert card into correct position in suit row
        let inserted = false;
        for (const existingScene of suitRow.querySelectorAll(".scene")) {
            const existingValue = existingScene.dataset.value;
            const existingIndex = cardOrder.indexOf(existingValue);
            if (newValueIndex < existingIndex) {
                suitRow.insertBefore(newScene, existingScene);
                inserted = true;
                break;
            }
        }
        if (!inserted) suitRow.appendChild(newScene);

        const card = newScene.querySelector(".card");
        card.setAttribute("draggable", "true");
        card.classList.add("draggable");

        card.addEventListener("click", () => {
            card.classList.toggle("is-flipped");
        });

        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", newScene.outerHTML);
            setTimeout(() => {
                newScene.remove();
            }, 0);
        });
    });
}

window.addEventListener("load", renderFullDeck);
