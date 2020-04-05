<script>
  import { setMyCardsCallback } from "./GameData";
  import { getCard, cardHeight, cardWidth } from "./Cards";

  let myCards = { cards: ["C14", "D13"] };

  //once
  setMyCardsCallback(value => {
    myCards = value;
  });

  $: {
    var container1 = document.querySelector(".container1"),
      container2 = document.querySelector(".container2"),
      img = container2.querySelectorAll(".container2 img"),
      width = 50,
      stop = false;
    expand();
  }

  function expand() {
    for (var i = 0; i < img.length; i++) {
      img[i].style.width = width + "px";
    }
    if (stop) return;
    if (container2.clientHeight < container1.clientHeight) {
      width++;
      expand();
    } else {
      width--;
      stop = true;
      expand();
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
</style>

<div class="gridMyCards">
  <h1>My Cards</h1>
  <div class="cards">

    {#each myCards.cards as el}
      <img alt={el} height={cardHeight} width={cardWidth} src={getCard(el)} />
    {/each}
  </div>
</div>
