// deck.js
var cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["diamonds", "hearts", "spades", "clubs"];


//Sets suit using switch statement
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
        for (let value of cards) {
            const scene = document.createElement("div");
            scene.classList.add("scene");

            const card = document.createElement("div");
            card.classList.add("card", suit);
            const front = document.createElement("div");
            front.classList.add("card-front");
            front.innerHTML = value + " " + getSuitIcon(suit);

            const back = document.createElement("div");
            back.classList.add("card-back");

card.appendChild(front);
card.appendChild(back);


            // Only becomes draggable after click
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
            display.appendChild(scene);
        }
    }
    setupDropZone();
}

function setupDropZone() {
    const dropZone = document.getElementById("my-deck");

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

        // Rebind events
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
}

window.addEventListener("load", renderFullDeck);
