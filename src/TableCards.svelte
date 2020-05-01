<script>
  import { setTableCardsCb } from "./support/Communication";
  import { getCard } from "./support/Cards";
  import { onMount } from "svelte";

  export let me;

  onMount(() => {
    console.log("TableCards onMount");
    setTableCardsCb(value => {
      me = value;
    });
  });

  function select(event) {
    // let card = event.target.getAttribute('card')
    // let thisCard = allCards.find(e => e.card === card)
    // if (thisCard.set === 'myCards') {
    //   if (thisCard.selected) {
    //     ;(thisCard.selected = false), selectCount--
    //     selectMine--
    //   } else {
    //     if (selectCount < 5) {
    //       ;(thisCard.selected = true), selectCount++
    //       selectMine++
    //     }
    //   }
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

<div class="flexRow">
  <div class="flexRow" />
  {#if me && me.cards}
    {#each me.cards as c}
      <div
        on:click={select}
        card={'dealt' + c}
        class={c.selected ? 'card selected' : 'card'}>
        <svg
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <image href={getCard(c)} height="110" width="72" />
        </svg>
      </div>
    {/each}
  {/if}
</div>
