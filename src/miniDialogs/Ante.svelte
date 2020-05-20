<script>
  import { myActions, myStatus } from "../support/Communication";
  import BuyIn from "./BuyIn.svelte";
  import { registerDump } from "../support/Dumper.js";
  import { onMount } from "svelte";

  export let me;

  let errorMessage = "";
  let localMiniDialog = null;

  onMount(() => {
    return registerDump("Ante.svelte", me, errorMessage, localMiniDialog);
  });

  function payAnte() {
    me.cb({ action: "pay" });
    myActions.set({ type: "MyActions", miniDialog: "default" });
  }

  function buyIn() {
    localMiniDialog = "BuyIn";
  }

  function buyInCb() {
    localMiniDialog = null;
  }

  function skipRound() {
    me.cb({ action: "pass" });
    myActions.set({ type: "MyActions", miniDialog: "default" });
  }

  function takeBreak() {
    me.cb({ action: "break" });
    myActions.set({ type: "MyActions", miniDialog: "default" });
  }

  function fAmount(amt) {
    return `${(amt / 100).toFixed(2)}`;
  }
</script>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
  }

  .title {
    text-align: center;
    font-weight: bold;
    padding-top: 10px;
  }

  .btn {
    background-color: cadetblue;
    height: 50px;
    width: 100px;
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 0px;
  }

  .flexCol {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error {
    text-align: center;
    font-weight: bolder;
    color: red;
  }
</style>

<div class="wrap">
  {#if localMiniDialog}
    {#if localMiniDialog === 'BuyIn'}
      <BuyIn cb={buyInCb} />
    {/if}
  {:else}
    <div id="pup-ante" class="title">Time to Ante-Up</div>
    <div>Game is {me.game}</div>
    <div>Ante amount is {fAmount(me.anteAmount)}</div>
    <div class="flexCol">
      <button id="pup-payante" class="btn" on:click={payAnte}>
        Pay the ante
      </button>
      {#if $myStatus.chips < 1000}
        <button class="btn" on:click={buyIn}>Buy more chips</button>
      {/if}
      <button class="btn" on:click={skipRound}>Skip this round</button>
      <button class="btn" on:click={takeBreak}>Go on a break</button>
    </div>
    <div class="error">{errorMessage}</div>
  {/if}
</div>
