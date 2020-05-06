<script>
  import { onMount } from "svelte";
  import {
    myCards,
    selectedCards,
    selectEnabled
  } from "./support/Communication";
  import { getCard } from "./support/Cards";

  let me;
  let selecting = false;
  let selected = [];

  onMount(() => {
    myCards.subscribe(value => {
      me = value;
    });
    selectedCards.subscribe(value => {
      console.log(`mc selectedCards    ${JSON.stringify(value)}`);
      selected = value;
    });
    selectEnabled.subscribe(value => {
      console.log(`mc selectEnabled    ${JSON.stringify(value)}`);
      selecting = value;
    });
  });

  function select(event) {
    if (selecting) {
      let success;
      let card = event.currentTarget.getAttribute("card");
      console.log(`tc select card: ${card}`);
      if (selected.includes(card)) {
        selectedCards.remove("MyCards", card);
      } else {
        if (selected.length < 5) {
          selectedCards.add("MyCards", card);
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

  .sel {
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
        class={selected.includes(card) ? 'card sel' : 'card'}>
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
