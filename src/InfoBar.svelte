<script>
  import { onMount } from "svelte";
  import {
    infoGame,
    infoPot,
    infoMsg,
    infoName
  } from "./support/Communication";

  let message = "";
  let game = "Not Set";
  let pot = 0;
  let name = "Not Set";

  onMount(() => {
    infoGame.subscribe(value => {
      game = value.game;
    });
    infoPot.subscribe(value => {
      pot = value.pot;
    });
    infoMsg.subscribe(value => {
      console.log(`ib value   ${JSON.stringify(value)}`);
      message = value.message;
    });
    infoName.subscribe(value => {
      name = value.name;
    });
  });

  function fAmount(amt) {
    return `${(amt / 100).toFixed(2)}`;
  }
</script>

<style>
  .flexRow {
    display: flex;
    flex-direction: row;
  }
  .info {
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 2px;
    margin-bottom: 20px;
  }
</style>

<div class="flexRow">
  <div class="info">Player: {name}</div>
  <div class="info">Game: {game}</div>
  <div class="info">Pot: {fAmount(pot)}</div>
  <div class="info">Message: {message}</div>
</div>
