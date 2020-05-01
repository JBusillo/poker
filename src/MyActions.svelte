<script>
  import { getSocket, setMyActionsCb } from "./support/Communication";
  import { onMount, beforeUpdate } from "svelte";
  export let me;

  onMount(() => {
    console.log("myActions onMount");
    setMyActionsCb(value => {
      me = value;
      console.log(`MyAction CB ${JSON.stringify(value)}`);
    });
  });

  beforeUpdate(() => {
    console.log("me");
    console.log(me);
  });

  function begin() {
    getSocket().emit("ClientMessage", { msgType: "beginTable" });
  }

  function dealer() {
    console.log("dealer");
  }

  function buyin() {
    console.log("buyin");
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
        <button class="btn" on:click={begin}>Begin</button>
      {/if}
      {#if button === 'buyin'}
        <button class="btn" on:click={buyin}>Buy In</button>
      {/if}
      {#if button === 'dealer'}
        <button class="btn" on:click={dealer}>Dealer</button>
      {/if}
    {/each}
  {/if}
</div>
