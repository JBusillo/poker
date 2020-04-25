<script>
  import { onMount } from "svelte";
  import {
    getSocket,
    setDialog,
    setShowDownCb
  } from "../support/Communication";
  export let endDialog;
  export let dialogData;
  export let dialogCallback;

  console.log(endDialog, dialogData, dialogCallback);

  let showDown = null;

  onMount(() => {
    setShowDown(value => {
      showDown = value;
    });
  });
</script>

<style>

</style>

<div>
  <h1>Showdown</h1>
</div>
