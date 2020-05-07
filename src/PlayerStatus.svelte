<script>
  import { getCard } from "./support/Cards";
  import { onMount } from "svelte";
  import { playerStatus, highLight } from "./support/Communication";

  export let player;
  let thisUuid;
  let plr;

  onMount(() => {
    thisUuid = player.uuid;
    plr = player;

    // First Time: Other players
    console.log(
      `ps onMount thisUuid: ${thisUuid} player: ${JSON.stringify(player)}`
    );

    playerStatus.subscribe(value => {
      if (value) {
        console.log(`ps value ${JSON.stringify(value)}`);
        if (value.player.uuid === thisUuid) {
          console.log(`ps matched uuid ${JSON.stringify(value.player)}`);
          plr = value.player;
        }
      }
    });

    highLight.subscribe(value => {
      if (value.uuid == thisUuid) {
        plr.highLight = true;
      } else {
        plr.highLight = false;
      }
      plr = plr;
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
  .highlight {
    background-color: lightgreen;
  }
</style>

{#if plr}
  <div id={plr.uuid} class="leftbox {plr.highLight ? 'highlight' : ''}">
    <div>{plr.name}</div>
    <div>Status: {plr.status}</div>
    <div>Last Action: {plr.lastAction}</div>
    <div>Chips: {fAmount(plr.chips)}</div>
    <div>Buy Ins: {fAmount(plr.buyIn)}</div>
  </div>
{:else}
  <div />
{/if}
