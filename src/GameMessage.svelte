<script>
  import { onMount } from "svelte";
  import { gameMessage } from "./support/Communication";

  let msg = "";

  onMount(() => {
    gameMessage.subscribe(value => {
      msg = value;
    });
  });
</script>

<style>
  .flexRow {
    display: flex;
    flex-direction: row;
  }
</style>

<div class="flexRow">
  <div>POKER</div>
  <div>{msg.message}</div>
</div>
