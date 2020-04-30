<script>
  import { onMount } from "svelte";
  import { setGameMessageCb } from "./support/Communication";

  let gameMessage = {};

  onMount(() => {
    console.log("GameMessage.svelte onMount");
    setGameMessageCb(value => {
      gameMessage = value;
    });
  });

  $: gameMessage = gameMessage;
</script>

<style>
  .flexRow {
    display: flex;
    flex-direction: row;
  }
</style>

<div class="flexRow">
  <div>POKER</div>
  <div>{gameMessage.message}</div>
</div>
