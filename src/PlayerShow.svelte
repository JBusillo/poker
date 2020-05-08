<script>
  import { getCard } from "./support/Cards";
  import { beforeUpdate } from "svelte";
  import { playerShow } from "./support/Communication";
  import { onMount } from "svelte";

  export let uuid;

  let thisUuid;
  let PlayerShow;
  let playedCards = [];
  let message = "";
  let hand = "";
  let display = "none";

  onMount(() => {
    thisUuid = uuid;
    playedCards = [];
    playerShow.subscribe(value => {
      if (value.uuid === thisUuid) {
        if (value.cards) {
          playedCards = value.cards;
          hand = value.hand;
          display = "cards";
        }
        if (value.message) {
          message = value.message;
          display = "message";
        }
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

<div>
  {#if display === 'cards'}
    {#each playedCards as card}
      <div class="card">
        <svg
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <image href={getCard(card)} height="110" width="72" />
        </svg>
      </div>
    {/each}
  {/if}
  {#if display === 'cards'}{message}{/if}
</div>
