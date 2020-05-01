<script>
  import { setMyCardsCb } from "./support/Communication";
  import { onMount, beforeUpdate } from "svelte";
  import { getCard } from "./support/Cards";
  export let me;

  onMount(() => {
    console.log("myCards onMount");
    setMyCardsCb(value => {
      console.log(`cb mycards me   ${JSON.stringify(me)}`);
      me = value;
    });
  });

  beforeUpdate(() => {
    console.log(`bu mycards me   ${JSON.stringify(me)}`);
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
