<script>
  import { beforeUpdate } from "svelte";
  import Admin from "./miniDialogs/Admin.svelte";
  import {
    infoGame,
    infoPot,
    infoMsg,
    myStatus,
    pupTag
  } from "./support/Communication";

  let uuid = window.sessionStorage.getItem("uuid");
  let adminDialog = false;

  beforeUpdate(() => {
    if (!uuid) uuid = window.sessionStorage.getItem("uuid");
  });

  function fAmount(amt) {
    return `${(amt / 100).toFixed(2)}`;
  }

  const adminCb = () => {
    adminDialog = false;
  };

  function handleClick() {
    adminDialog = true;
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

  .btn {
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 2px;
    margin-bottom: 20px;
  }
</style>

<div class="flexRow">
  {#if adminDialog}
    <Admin {adminCb} />
  {:else}
    <div class="info">Player: {$myStatus.name}</div>
    <div class="info">Game: {$infoGame}</div>
    <div class="info">Chips: {fAmount($myStatus.chips)}</div>
    <div class="info">Pot: {fAmount($infoPot)}</div>
    <div class="info">Message: {$infoMsg}</div>
    <div id="pupTag" puptag={$pupTag} />
    <button class="btn" on:click={handleClick}>Admin</button>
  {/if}

</div>
