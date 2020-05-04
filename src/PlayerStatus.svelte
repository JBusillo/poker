<script>
  import { getCard } from "./support/Cards";
  import { onMount, beforeUpdate } from "svelte";
  import { setPlayerStatusCb } from "./support/Communication";

  export let player;
  let uuid;

  onMount(() => {
    uuid = player.uuid;
    setPlayerStatusCb(value => {
      if (value.uuid === uuid) {
        player = value;
      }
    });
  });

  function fAmount(amt) {
    return `$${(amt / 100).toFixed(2)}`;
  }
</script>

<style>
  .leftbox {
    margin-top: 3px;
    border-style: solid none solid solid;
    border-radius: 3px 0 0 3px;
  }
</style>

{#if player}
  <div id={player.uuid} class="leftbox">
    <div>{player.name}</div>
    <div>Status: {player.status}</div>
    <div>Last Action: {player.lastAction}</div>
    <div>Chips: {fAmount(player.chips)}</div>
    <div>Buy Ins: {fAmount(player.buyIn)}</div>
  </div>
{:else}
  <div />
{/if}
