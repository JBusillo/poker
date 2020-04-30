<script>
  import { getCard } from "./support/Cards";
  import { beforeUpdate, onMount } from "svelte";
  import { setPlayerStatusCb } from "./support/Communication";
  export let player;

  let playerStatus;
  let uuid = player.uuid;

  onMount(() => {
    console.log("PlayerStatus.svelte onMount");
    setPlayerStatusCb(value => {
      playerStatus = value;
    });
  });

  $: player = player;

  beforeUpdate(() => {
    console.log("bu PlayerStatus");
  });
</script>

<style>
  .leftbox {
    margin-top: 3px;
    border-style: solid none solid solid;
    border-radius: 3px 0 0 3px;
  }
</style>

<div id={uuid} class="leftbox">
  <div>{player.name}</div>
  <div>Status: {player.status}</div>
  <div>Last Action: {player.lastAction}</div>
  <div>Chips: {player.chips}</div>
  <div>Buy Ins: {player.buyIn}</div>

</div>
