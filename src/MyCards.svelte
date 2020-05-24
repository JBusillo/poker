<script>
  import { onMount, afterUpdate } from "svelte";
  import { registerDump } from "./support/Dumper.js";
  import {
    myCards,
    selectedCards,
    selectEnabled,
    discardEnabled,
    smallScreen
  } from "./support/Communication";

  let image;

  onMount(() => {
    return registerDump("MyCards.svelte");
  });

  afterUpdate(() => {
    draw();
  });

  function select(event) {
    if ($selectEnabled || $discardEnabled) {
      let card = event.currentTarget.getAttribute("card");
      if ($selectedCards.includes(card)) {
        selectedCards.remove("MyCards", card);
      } else {
        selectedCards.add("MyCards", card);
      }
    }
    $myCards.cards = $myCards.cards;
    draw();
  }

  function getCoordinates(card) {
    let y = "CDHS".indexOf(card.substr(0, 1)) * 110;
    let x = ("14020304050607080910111213".indexOf(card.substr(1, 2)) / 2) * 72;
    return { x, y };
  }

  function draw() {
    image = document.getElementById(`cards`);
    if ($myCards && $myCards.cards) {
      for (let card of $myCards.cards) {
        let can = document.getElementById(`cv${card}`);
        let ctx = can.getContext("2d");
        let coord = getCoordinates(card);
        console.log(`draw ${card} x:${coord.x} y:${coord.y} `);
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.drawImage(image, coord.x, coord.y, 72, 110, 0, 0, 72, 110);
        if ($selectedCards.includes(card) && $discardEnabled) {
          ctx.lineWidth = 5;
          ctx.strokeStyle = "red";
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(72, 110);
          ctx.moveTo(72, 0);
          ctx.lineTo(0, 110);
          ctx.closePath();
          ctx.stroke();
        }
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

  .flexCol {
    display: flex;
    flex-direction: column;
  }

  .card {
    max-width: 72px;
    max-height: 110px;
    height: auto;
    width: auto;
  }
</style>

<div class="flexCol">
  <div id="mc-cards" class="flexRow">
    <div style="display:none;">
      <img
        id="cards"
        alt="a card"
        src="./build/assets/cards.svg"
        height="110"
        width="72" />
    </div>

    {#if $myCards && $myCards.cards}
      {#each $myCards.cards as card}
        <div on:click={select} {card} class="card">
          <canvas id={`cv${card}`} width="72" height="110" />
        </div>
      {/each}
    {/if}
  </div>
  {#if $smallScreen}
    <div>My Cards</div>
  {/if}
</div>
