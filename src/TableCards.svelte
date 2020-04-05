<script>
  import { setTableCardsCallback } from "./GameData";
  import { Cards } from "./cards";
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
    height: 100px;
    margin: 3px;
  }

  .cardwrap {
    /* flex: 1 1 15%; */
    width: auto; /*or whatever you choose*/
    min-height: 0;
    min-width: 0;
    /* border-style: solid;
    border-radius: 3px;
    border-color: black;
    border-width: 2px; */
    margin: 2px;
    padding: 2px;
    row-gap: 2px;
    /* margin: auto; */
  }

  .cardwrap img {
    padding: 5px;
    border-style: solid;
    border-radius: 3px;
    border-color: black;
    border-width: 2;
    /* display: block; */
    /* width: 20%; */
    min-height: 0;
    min-width: 0;
    max-width: 100px; /*actual image width*/
    height: auto; /* maintain aspect ratio*/
    margin: auto; /*optional centering of image*/
  }
</style>

<div class="gridTableCards">
  <h1>Dealt Cards</h1>
  <div class="cards">

    {#each tableCards.cards as el}
      <div class="cardwrap">
        <img alt="alt" width="100" src={Cards.get(el)} />
      </div>
    {/each}
  </div>

</div>
