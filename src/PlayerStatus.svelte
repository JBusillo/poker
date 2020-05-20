<script>
  import { onMount } from "svelte";
  import { registerDump } from "./support/Dumper.js";
  import { myStatus, playerStatus, highLight } from "./support/Communication";

  export let player;

  let thisUuid;
  let plr;
  let myUuid = window.sessionStorage.getItem("uuid");

  onMount(() => {
    thisUuid = player.uuid;
    plr = player;

    playerStatus.subscribe(value => {
      if (value) {
        if (value.player.uuid === thisUuid) {
          plr = value.player;
        }
        if (value.player.uuid === myUuid) {
          $myStatus = value.player;
        }
      }
    });

    // action='HighLight'  {uuid} action='only'/'on'/'off'/'reset'
    highLight.subscribe(value => {
      let prevHighLight = plr.highLight;
      switch (value.action) {
        case "only":
          plr.highLight = value.uuid === thisUuid ? true : false;
          break;
        case "on":
          plr.highLight = value.uuid === thisUuid ? true : plr.highLight;
          break;
        case "off":
          plr.highLight = value.uuid === thisUuid ? false : plr.highLight;
          break;
        case "reset":
          plr.highLight = false;
      }
      // force re-render if highLight has changed
      if (plr.highLight !== prevHighLight) plr = plr;
    });
    return registerDump("PlayerStatus.svelte", thisUuid, plr);
  });

  function breakMessage(plr) {
    if (plr.isOnBreak && plr.isOnBreakNextRound) {
      return "(On Break)";
    } else {
      if (plr.isOnBreak && !plr.isOnBreakNextRound) {
        return "(Will Resume)";
      } else {
        if (plr.isOnBreakNextRound) {
          return "(Will Break)";
        } else return "";
      }
    }
  }

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
    <div>{plr.name} {breakMessage(plr)}</div>
    <div>Status: {plr.status}</div>
    <div>Last Action: {plr.lastAction}</div>
    <div>
      Chips: {fAmount(plr.chips)} Bets: {fAmount(plr.totalBetThisRound)}
    </div>
    <div>Buy Ins: {fAmount(plr.buyIn)}</div>
  </div>
{:else}
  <div />
{/if}
