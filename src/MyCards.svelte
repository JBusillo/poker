<script>
  import { setMyCardsCallback } from "./GameData";
  import { getCard, cardHeight, cardWidth } from "./Cards";
  import { afterUpdate, beforeUpdate } from "svelte";

  let myCards = { cards: ["C14", "D13"] };

  //once
  setMyCardsCallback(value => {
    myCards = value;
    x++;
    console.log(myCards.cards);
  });

  let wrap_id = "my_cards";
  let x = 1;

  afterUpdate(() => {
    console.log("afterUpdate");
    modify_dom();
  });

  function modify_dom() {
    var elGrid = document.getElementsByClassName("gridMyCards")[0];
    var elHead = document.getElementsByClassName("MCHead")[0];
    let max_height = elGrid.clientHeight - elHead.clientHeight;
    let max_width = elGrid.clientWidth;
    console.log(`max_height = ${max_height}`);

    var ideal_height = max_height;
    var ideal_width = Math.trunc((72 / 100) * ideal_height);
    var orig_height = ideal_height;
    var orig_width = ideal_width;
    var final_height = 110;
    var final_width = 72;
    console.log(myCards.cards.length);

    // Will all the elements fit cross-wise?
    var imgs_across = Math.trunc(max_width / ideal_width);
    if (myCards.cards.length <= imgs_across) {
      create(ideal_height, ideal_width);
      return;
    }
    if (myCards.cards.length <= imgs_across * 2) {
      create(ideal_height / 2, ideal_width / 2);
      return;
    }
    if (myCards.cards.length <= imgs_across * 4) {
      create(ideal_height / 3, ideal_width / 3);
      return;
    }
    if (myCards.cards.length <= imgs_across * 8) {
      create(ideal_height / 3, ideal_width / 4);
      return;
    }
    if (myCards.cards.length <= imgs_across * 16) {
      create(ideal_height / 3, ideal_width / 5);
      return;
    }
    throw "Too Many Cards";

    function create(h, w) {
      var fragment = document.createDocumentFragment();

      myCards.cards.forEach(el => {
        var img = document.createElement("img");

        // var alt = document.createAttribute("alt");
        // alt.value = el;
        img.setAttribute("alt", el);

        // var height = document.createAttribute("height");
        // alt.value = h;
        img.setAttribute("height", h);

        // var width = document.createAttribute("width");
        // alt.value = w;
        img.setAttribute("width", w);

        // var src = document.createAttribute("src");
        // alt.value = getCard(el);
        img.setAttribute("src", getCard(el));

        fragment.appendChild(img);
      });
      var div = document.getElementById("my_cards");

      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }

      div.appendChild(fragment);
    }
  }
</script>

<style>
  .gridMyCards {
    grid-area: MC;
    background-color: lightyellow;
    min-height: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .cards {
    height: 110;
    width: 74;
  }
</style>

<div class="gridMyCards" dummy={x}>
  <div class="MCHead">
    <h1>My Cards</h1>
  </div>
  <div id="my_cards" class="mycards cards" />
</div>
