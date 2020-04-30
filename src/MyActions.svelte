<script>
  import { getSocket, setMyActionsCb } from "./support/Communication";
  import { onMount } from "svelte";
  export let action;

  let pAction;

  onMount(() => {
    console.log("myActions onMount");
    setMyActionsCb(value => {
      action = action.action;
      console.log(`MyAction CB ${JSON.stringify(action)}`);
    });
  });

  function begin() {
    getSocket().emit("ClientMessage", { msgType: "beginTable" });
  }

  function dealer() {
    console.log("dealer");
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
  {#if action === 'begin'}
    <button class="btn" on:click={begin}>Begin</button>
  {/if}
  {#if action === 'clear'}
    <div />
  {/if}
  {#if action === 'dealer'}
    <button class="btn" on:click={dealer}>Dealer</button>
  {/if}
</div>
