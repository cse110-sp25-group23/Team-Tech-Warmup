const shuffleBtn = document.getElementById("shuffleBtn");
const cards = document.querySelectorAll(".card");

shuffleBtn.addEventListener("click", () => {
    cards.forEach((card, i) => {
        // Add a slight delay per card for staggered effect
        setTimeout(() => {
            card.classList.add("shuffling");

            // Remove the animation class after it completes
            setTimeout(() => {
                card.classList.remove("shuffling");
            }, 600);
        }, i * 100);
    });
});

