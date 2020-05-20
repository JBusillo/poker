<script>
  import { onMount } from "svelte";
  import { registerDump } from "./support/Dumper.js";
  import {
    myCards,
    selectedCards,
    selectEnabled,
    discardEnabled
  } from "./support/Communication";
  import { getCard } from "./support/Cards";

  onMount(() => {
    return registerDump("MyCards.svelte");
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
  }

  // var can = document.getElementById('canvas1');
  // var ctx = can.getContext('2d');
  // const image = document.getElementById('source');

  // image.addEventListener('load', e => {
  //   ctx.drawImage(image, 0, 0, 150, 150, 0, 0, 150, 150);
  //   ctx.lineWidth = 5;
  //   ctx.strokeStyle = 'red';
  //   ctx.beginPath();
  //   ctx.moveTo(0,0);
  //   ctx.lineTo(150,150);
  //   ctx.moveTo(0,150);
  //   ctx.lineTo(150,0);
  //   ctx.closePath();
  //   ctx.stroke();
  // });
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

  .sel {
    border-style: solid;
    border-radius: 2px;
    border-width: 3px;
    border-color: green;
  }
</style>

<!-- <canvas id="canvas1" width="400" height="400">
</canvas>

<div style="display:none;">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <img id="source"
       src="http://upload.wikimedia.org/wikipedia/commons/d/d2/Svg_example_square.svg"
       width="150" height="150">
  </svg>
</div> -->

<div id="mc-cards" class="flexRow">
  {#if $myCards && $myCards.cards}
    {#each $myCards.cards as card}
      <div
        on:click={select}
        {card}
        class={$selectedCards.includes(card) ? 'card sel' : 'card'}>
        <svg
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <image href={getCard(card)} height="110" width="72" />
        </svg>
      </div>
    {/each}
  {/if}
</div>
