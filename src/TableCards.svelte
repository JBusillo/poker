<script>
  import { onMount } from "svelte";
  import {
    tableCards,
    selectedCards,
    selectEnabled
  } from "./support/Communication";
  import { getCard } from "./support/Cards";

  let me;
  let selecting = false;
  let selected = [];

  onMount(() => {
    tableCards.subscribe(value => {
      me = value;
    });
    selectedCards.subscribe(value => {
      selected = value;
    });
    selectEnabled.subscribe(value => {
      selecting = value;
    });
  });

  function select(event) {
    if (selecting) {
      let success;
      let card = event.currentTarget.getAttribute("card");
      if (selected.includes(card)) {
        selectedCards.remove("TableCards", card);
      } else {
        if (selected.length < 5) {
          selectedCards.add("TableCards", card);
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

  .selected {
    border-style: solid;
    border-radius: 2px;
    border-width: 3px;
    border-color: green;
  }
</style>

<div class="flexRow">
  <div class="flexRow" />
  {#if me && me.cards}
    {#each me.cards as card}
      <div
        on:click={select}
        {card}
        class={selected.includes(card) ? 'card selected' : 'card'}>
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
