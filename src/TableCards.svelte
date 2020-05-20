<script>
  import { onMount } from "svelte";
  import { registerDump } from "./support/Dumper.js";
  import {
    tableCards,
    selectedCards,
    selectEnabled
  } from "./support/Communication";
  import { getCard } from "./support/Cards";

  onMount(() => {
    return registerDump("TableCards.svelte");
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

  .selected {
    border-style: solid;
    border-radius: 2px;
    border-width: 3px;
    border-color: green;
  }
</style>

<div id="tc-cards" class="flexRow ">
  {#if $tableCards && $tableCards.cards}
    {#each $tableCards.cards as card}
      <div
        on:click={select}
        {card}
        class={$selectedCards.includes(card) ? 'card selected' : 'card'}>
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
