<script>
  import { setMyCardsCb, getSocket } from "./support/Communication";
  import { getCard, cardHeight, cardWidth, resizeCards } from "./support/Cards";
  import { afterUpdate, beforeUpdate, onMount } from "svelte";

  let myCards = { cards: ["C14", "D13"] };
  let x = 1;

  onMount(() => {
    setMyCardsCb(value => {
      x++;
      myCards = value;
    });
  });

  beforeUpdate(() => x++);

  afterUpdate(() => {
    resizeCards("gridMyCards", "MCHead", myCards.cards, "MCCards");
  });
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

<div class="gridMyCards" dummy={x}>
  <div class="MCHead">My Cards</div>
  <div id="MCCards" />
</div>
