<script>
  import { setMyCardsCallback } from "./GameData";
  import { getCard } from "./Cards";

  let myCards = { cards: ["C14", "D13"] };

  //once
  setMyCardsCallback(value => {
    myCards = value;
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

<div class="gridMyCards">
  <h1>My Cards</h1>
  <div class="cards">

    {#each myCards.cards as el}
      <div class="cardwrap">
        <img alt={el} width="100" src={getCard(el)} />
      </div>
    {/each}
  </div>
</div>
