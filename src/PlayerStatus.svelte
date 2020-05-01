<script>
  import { getCard } from "./support/Cards";
  import { onMount } from "svelte";
  import { setPlayerStatusCb } from "./support/Communication";

  export let player;

  onMount(() => {
    console.log("PlayerStatus.svelte onMount");
    setPlayerStatusCb(value => {
      player = value;
      // if (uuid === value.uuid) {
      //   player = value;
      //   console.log("in PlayerStatus Callback uuid=uuid");
      // }
    });
  });
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
    <div>Chips: {player.chips}</div>
    <div>Buy Ins: {player.buyIn}</div>
  </div>
{:else}
  <div />
{/if}
