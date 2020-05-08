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

    playerStatus.subscribe(value => {
      if (value) {
        if (value.player.uuid === thisUuid) {
          plr = value.player;
        }
      }
    });

    // action='HighLight'  {uuid} action='only'/'on'/'off'/'reset'
    highLight.subscribe(value => {
      let prevHighLight = plr.highLight;
      switch (value.action) {
        case "only":
          plr.highLight = value.uuid == thisUuid ? true : false;
          break;
        case "on":
          plr.highLight = value.uuid == thisUuid ? true : plr.highLight;
          break;
        case "off":
          plr.highLight = value.uuid == thisUuid ? false : plr.highLight;
          break;
        case "reset":
          plr.highLight = false;
      }
      // force re-render if highLight has changed
      if (plr.highLight !== prevHighLight) plr = plr;
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
