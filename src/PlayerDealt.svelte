<script>
  import { getCard } from "./support/Cards";
  import PlayerStatus from "./PlayerStatus.svelte";
  import { onMount, beforeUpdate } from "svelte";
  import { setPlayerDealtCb } from "./support/Communication";

  export let cards;
  export let uuid;

  let thisUuid;

  onMount(() => {
    let thisUuid = uuid;
    setPlayerDealtCb(value => {
      if ((value.type = "PlayerCards") && value.uuid == thisUuid) {
        cards = value.cards;
      }
    });
  });

  beforeUpdate(() => {
    // console.log(`bu cards   ${JSON.stringify(player.cards)}`);
    // cards = player.cards;
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
