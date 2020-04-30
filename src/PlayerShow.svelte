<script>
  import { getCard } from "./support/Cards";
  import PlayerStatus from "./PlayerStatus.svelte";
  import { beforeUpdate } from "svelte";
  export let player;
  export let init;
</script>

<style>
  .card {
    max-width: 72px;
    max-height: 110px;
    height: auto;
    width: auto;
  }
</style>

{#if !init}
  {#each player.cardsPlayed as cp}
    <div class="card">
      <svg
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <image href={getCard(cp)} height="110" width="72" />
      </svg>
    </div>
  {/each}
{/if}
