const shuffleBtn = document.getElementById("shuffleBtn");
const cards = document.querySelectorAll("playing-card");

shuffleBtn.addEventListener("click", () => {
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.shuffle();
        }, i * 100);
    });
});
