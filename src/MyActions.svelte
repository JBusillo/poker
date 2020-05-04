<script>
  import {
    getSocket,
    setDialog,
    setMyActionsCb
  } from "./support/Communication";
  import { onMount } from "svelte";
  //  export let me;

  let me;

  onMount(() => {
    setMyActionsCb(value => {
      me = value;
    });
  });

  function begin() {
    getSocket().emit("ClientMessage", { msgType: "beginTable" });
  }

  function dealer() {
    // console.log("dealer");
  }

  function buyIn(event) {
    setDialog({
      dialog: "BuyIn2"
    });
  }
</script>

<style>
  .btn {
    background-color: cadetblue;
    height: 50px;
    width: 100px;
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 0px;
  }
</style>

<div>
  {#if me}
    {#each me.buttons as button}
      <!-- content here -->
      {#if button === 'begin'}
        <button class="btn" pup="me-begin" on:click={begin}>Begin</button>
      {/if}
      {#if button === 'buyin'}
        <button class="btn" pup="me-buyin" on:click={buyIn}>Buy In</button>
      {/if}
      {#if button === 'dealer'}
        <button class="btn" on:click={dealer}>Dealer</button>
      {/if}
    {/each}
  {/if}
</div>
