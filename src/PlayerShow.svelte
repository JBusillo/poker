<script>
  import { getCard } from "./support/Cards";
  import { beforeUpdate } from "svelte";
  import { setPlayerShowCb } from "./support/Communication";
  import { onMount } from "svelte";

  let PlayerShow;

  onMount(() => {
    console.log("PlayerShow.svelte onMount");
    setPlayerShowCb(value => {
      PlayerShow = value;
    });
  });
</script>

<style>
  .card {
    max-width: 72px;
    max-height: 110px;
    height: auto;
    width: auto;
  }
</style>

{#if PlayerShow}
  {#each PlayerShow.cardsPlayed as cp}
    <div class="card">
      <svg
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <image href={getCard(cp)} height="110" width="72" />
      </svg>
    </div>
  {/each}
{:else}
  <div />
{/if}
