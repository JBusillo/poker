<script>
  import { getCard } from "./support/Cards";
  import PlayerStatus from "./PlayerStatus.svelte";
  import { onMount } from "svelte";
  import { setPlayerDealtCb } from "./support/Communication";

  export let player;

  onMount(() => {
    console.log("PlayerDealt.svelte onMount");
    setPlayerDealtCb(value => {
      player = value;
      console.log(`PlayerDealtCb ${JSON.stringify(player)}`);
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

{#if player && player.cards}
  {#each player.cards as cp}
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
