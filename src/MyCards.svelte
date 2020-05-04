<script>
  import { myCards } from "./support/Communication";
  import { onMount } from "svelte";
  import { getCard } from "./support/Cards";

  let me;

  onMount(() => {
    myCards.subscribe(value => {
      me = value;
    });
  });

  function select(event) {}
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
