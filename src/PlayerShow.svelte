<script>
  import { getCard } from "./support/Cards";
  import { playerShow } from "./support/Communication";
  import { onMount } from "svelte";
  import { registerDump } from "./support/Dumper.js";

  export let uuid;

  let thisUuid;
  let playedCards = [];
  let messages = [];
  let hand = "";
  let display = "none";

  onMount(() => {
    thisUuid = uuid;
    playedCards = [];
    playerShow.subscribe(value => {
      if (value) {
        if (value.clearAllMessages) {
          messages = [];
          display = "message";
        } else {
          if (value.uuid === thisUuid) {
            if (value.cards) {
              playedCards = value.cards;
              hand = value.hand;
              display = "cards";
            }
            if (value.message) {
              messages = [...messages, value.message];
              display = "message";
            }
          }
        }
      }
    });
    return registerDump(
      "PlayerShow.svelte",
      thisUuid,
      playedCards,
      messages,
      hand,
      display
    );
  });
</script>

<style>
  .card {
    max-width: 72px;
    max-height: 110px;
    height: auto;
    width: auto;
  }

  .flexRow {
    display: flex;
    flex-direction: row;
  }
</style>

<div>
  {#if display === 'cards'}
    <div class="flexRow">
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
    </div>
    {#if hand}
      <div>{hand}</div>
    {/if}
  {/if}
  {#if display === 'message'}
    {#each messages as message}
      <div>{message}</div>
    {/each}
  {/if}
</div>
