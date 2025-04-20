// renderer.js

export function renderCard(card, faceUp = true) {
    const scene = document.createElement("div");
    scene.classList.add("scene");
  
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", card.suit);
  
    const front = document.createElement("div");
    front.classList.add("card-front");
    front.innerHTML = `${card.value} ${getSuitIcon(card.suit)}`;
  
    const back = document.createElement("div");
    back.classList.add("card-back");
  
    cardDiv.appendChild(front);
    cardDiv.appendChild(back);
    scene.appendChild(cardDiv);
  
    // schedule the flip *after* insertion into the DOM
    if (faceUp) {
      setTimeout(() => {
        cardDiv.classList.add("is-flipped");
      }, 50);
    }
  
    return scene;
  }
  
  function getSuitIcon(suit) {
    switch (suit) {
      case "hearts":   return "♥";
      case "spades":   return "♠";
      case "diamonds": return "♦";
      case "clubs":    return "♣";
    }
  }
  