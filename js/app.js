/*
 * Display the cards on the page
 *   - shuffle the list of cards
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *    + increment the move counter and display it on the page
 *    + if all cards have matched, display a message with the final score
 */

var clickedCard , moves , rating , locked;
var deck = [
  {
    name: 'fa-diamond',
  },
  {
    name: 'fa-paper-plane-o',
  },
  {
    name: 'fa-anchor',
  },
  {
    name: 'fa-bolt',
  },
  {
    name: 'fa-cube',
  },
  {
    name: 'fa-leaf',
  },
  {
    name: 'fa-bicycle',
  },
  {
    name: 'fa-bomb',
  },
  {
    name: 'fa-diamond',
  },
  {
    name: 'fa-paper-plane-o',
  },
  {
    name: 'fa-anchor',
  },
  {
    name: 'fa-bolt',
  },
  {
    name: 'fa-cube',
  },
  {
    name: 'fa-leaf',
  },
  {
    name: 'fa-bicycle',
  },
  {
    name: 'fa-bomb',
  },
];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCard(name) {
  var item = document.createElement('i');
  item.classList.add('fa');
  item.classList.add(name);

  var card = document.createElement('li');
  card.setAttribute('class', 'card');
  card.appendChild(item);

  return card;
}


function renderDeck() {
    shuffle(deck);
    var deckContainer = document.querySelector('.deck');
    deckContainer.innerHTML = '';

    deck.forEach(function(item) {
        var card = createCard(item.name);
        deckContainer.appendChild(card);
        if(!isLocked(name))
        addCardClickListener(card, item.name);
    });

}

function addCardClickListener(card, name) {
     card.addEventListener('click', function(event) {
         if(!isLocked(name)) {
           showCard(event.target);
           act(name);
         }
      });
}

function showCard(card) {
   card.classList.add('show', 'open');
}

function hideCard(card) {
    if(card.classList.contains('open')) {
        card.classList.add('mismatch');
        setTimeout(function() {
          card.classList.remove('show', 'open', 'mismatch');
        }, 500);
    }
}

function act(name) {
  if(clickedCard !== '') {
       setMoves();
       if(clickedCard === name) {
         lockCards(name);
         if(locked.length === 8)
           endGame();
       }
       else {
         closeCards([name, clickedCard]);
       }
       clickedCard = "";

 }
  else
    clickedCard = name;
}

function closeCards(arr) {
    arr.forEach(function(name) {
      var items = document.querySelectorAll('.'+name);
      items.forEach(function(item){
        hideCard(item.parentElement);
      });
    });
}

function lockCards(name) {
    document.querySelectorAll('.'+name).forEach(function(item) {
      item.parentElement.classList.add('match');
    });
    locked.push(name);
}

function isLocked(name) {
    if(locked.indexOf(name) === -1 )
       return false;
    else
       return true;
}


function setMoves() {
  moves++;
  document.querySelector('.moves').textContent = moves;
  if(moves % 8 == 0)
    reduceRating() ;
}

function reduceRating() {
  if(rating === 1)
   return;

  var ctr = 1;
  document.querySelectorAll('.stars > li').forEach(function(node) {
        if (ctr === rating) {
          node.firstChild.classList.remove('fa-star');
          node.firstChild.classList.add('fa-star-o');
          rating--;
        }
        ctr++;

  });
}


function init() {
  document.querySelectorAll('.restart').forEach(function(elem) {
      elem.addEventListener('click', function() {
      init();
    });
  });

  document.querySelectorAll('.stars > li').forEach(function(node) {
      node.firstChild.classList.remove('fa-star-o');
      node.firstChild.classList.add('fa-star');
 });

  moves = 0;
  rating = 3;
  clickedCard = '';
  locked = [];
  document.querySelector('.moves').textContent = moves;
  document.querySelector('.deck').style.display = 'flex';
  document.querySelector('.over').style.display = 'none';
  renderDeck();
}

function endGame() {
  document.querySelector('.deck').style.display = 'none';
  document.querySelector('.moveCount').textContent = moves;
  document.querySelector('.finalRating').innerHTML = rating;
  document.querySelector('.over').style.display = 'block';
 }


init();

//endGame();

