<script>
  import { onMount, afterUpdate } from "svelte";
  import { registerDump } from "./support/Dumper.js";
  import {
    tableCards,
    selectedCards,
    selectEnabled,
    smallScreen
  } from "./support/Communication";

  let image;

  onMount(() => {
    return registerDump("TableCards.svelte");
  });

  afterUpdate(() => {
    draw();
  });

  function select(event) {
    if ($selectEnabled) {
      let card = event.currentTarget.getAttribute("card");
      if ($selectedCards.includes(card)) {
        selectedCards.remove("TableCards", card);
      } else {
        selectedCards.add("TableCards", card);
      }
    }
    $tableCards.cards = $tableCards.cards;
    draw();
  }

  function getCoordinates(card) {
    let y = "CDHS".indexOf(card.substr(0, 1)) * 110;
    let x = ("14020304050607080910111213".indexOf(card.substr(1, 2)) / 2) * 72;
    return { x, y };
  }

  function draw() {
    image = document.getElementById(`cards`);
    if ($tableCards && $tableCards.cards) {
      for (let card of $tableCards.cards) {
        let can = document.getElementById(`cv${card}`);
        let ctx = can.getContext("2d");
        let coord = getCoordinates(card);
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.drawImage(image, coord.x, coord.y, 72, 110, 0, 0, 72, 110);
        if ($selectedCards.includes(card) && $selectEnabled) {
          ctx.fillStyle = "green";
          ctx.font = "bold 40px Helvetica, Arial, sans-serif";
          ctx.fillText("\u2713", 32, 70);
        }
      }
    }
  }
</script>

<style>
  .flexRow {
    display: flex;
    flex-direction: row;
  }

  .card {
    max-width: 72px;
    max-height: 110px;
    height: auto;
    width: auto;
  }
</style>

<div style="flexCol">
  <div id="tc-cards" class="flexRow ">
    <div style="display:none;">
      <img
        id="cards"
        alt="a card"
        src="./build/assets/cards.svg"
        height="110"
        width="72" />
    </div>

    {#if $tableCards && $tableCards.cards}
      {#each $tableCards.cards as card}
        <div on:click={select} {card} class="card">
          <canvas id={`cv${card}`} width="72" height="110" />
        </div>
      {/each}
    {/if}
  </div>
  {#if $smallScreen}
    <div>Table Cards</div>
  {/if}

</div>
