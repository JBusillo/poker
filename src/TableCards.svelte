<script>
  import { setTableCardsCb } from "src/support/Communication";
  import {
    getCard,
    cardHeight,
    cardWidth,
    resizeCards
  } from "src/support/Cards";
  import { onMount, beforeUpdate, afterUpdate } from "svelte";

  let x = 1;
  let tableCards = {
    cards: ["H14", "D14", "S13", "C02"]
  };

  onMount(() => {
    setTableCardsCb(value => {
      tableCards = value;
      x++;
    });
  });

  beforeUpdate(() => x++);

  afterUpdate(() => {
    resizeCards("gridTableCards", "TCHead", tableCards.cards, "TCCards");
  });

  if (tableCards) {
    if (tableCards.cards) {
    }
  }
</script>

<style>
  .gridTableCards {
    grid-area: TC;
    background-color: lightyellow;
    min-height: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="gridTableCards" dummy={x}>
  <div class="TCHead">Table Cards</div>
  <div id="TCCards" />

</div>
