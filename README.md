# Documentation: 

### Current Implementation:

Files created/edited:
- README.md
- index.html
- cards_wc.js
- cards_functions.js
- styles.css

The `index.html` file allows for our application to render the web component playing cards generated from the `cards_wc.js` file. 
These playing card components will then utilize functions in the `cards_functions.js` such as `shuffle` or `drawCards` to manipulate cards from our instantiated deck. The `styles.css` file is currently empty and contains no styling. All current visuals are generated from
imported images or gifs.

## Notes:

- Finished basics of playing-card components in `cards_wc.js`, but has no flip animation.
- Shuffle button is only for animation. (Deck gets shuffled before dealing cards for a new round.)

## To Do:
- limit hits --> currently can hit unlimited times and will get undefined of undefined cards if all 52 cards have been drawn already
- CSS graphics for playing-card wc is very simple (should change p tag text to symbol+suit)
- implement BlackJack game rules 
  - count player and dealer totals
    - compare totals to check win-loss status
  - have money states
