<script>
  import { getCard } from "./support/Cards";
  import { playerCards } from "./support/Communication";
  import { onMount } from "svelte";

  export let cards;
  export let uuid;

  let thisUuid;

  onMount(() => {
    let thisUuid = uuid;
    // if no uuid passed, set cards for all players (used to clear cards from table)
    // otherwise, only update cards for individual player
    playerCards.subscribe(value => {
      if (
        !value.uuid ||
        ((value.type = "PlayerCards") && value.uuid == thisUuid)
      ) {
        cards = value.cards;
      }
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

{#if cards && cards.length > 0}
  {#each cards as cp}
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
