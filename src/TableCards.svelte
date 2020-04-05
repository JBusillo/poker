<script>
  import { setTableCardsCallback } from "./GameData";
  import { getCard } from "./Cards";
  let tableCards = {
    cards: ["H14", "D14", "S13", "C02"]
  };

  //once
  setTableCardsCallback(value => {
    tableCards = value;
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

  .cards {
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    height: auto;
    width: auto;
    margin: 3px;
  }

  .cards img {
    /* height: 200px; */
    min-width: 0;
  }
</style>

<div class="gridTableCards">
  <h1>Dealt Cards</h1>
  <div class="cards">

    {#each tableCards.cards as el}
      <!-- <div class="cardwrap"> -->
      <img alt={el} height="110" width="72" src={getCard(el)} />
      <!-- <img alt={el} src={getCard(el)} /> -->
      <!-- </div> -->
    {/each}
  </div>

</div>
