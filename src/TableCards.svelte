<script>
  import { setTableCardsCb } from "./support/Communication";
  import { getCard, cardHeight, cardWidth } from "./support/Cards";
  import { onMount } from "svelte";

  let tableCards = {
    cards: ["H14", "D14", "S13", "C02"]
  };

  onMount(() => {
    setTableCardsCb(value => {
      tableCards = value;
    });
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

<div class="gridTableCards">
  <h1>Dealt Cards</h1>
  <div class="cards">

    {#each tableCards.cards as el}
      <img alt={el} height={cardHeight} width={cardWidth} src={getCard(el)} />
    {/each}
  </div>

</div>
