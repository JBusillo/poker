<script>
  import { setMyStatusCb } from "./support/Communication";
  import { onMount } from "svelte";

  let myStatus = null;

  onMount(() => {
    setMyStatusCb(value => {
      myStatus = value;
    });
  });

  if (myStatus) {
  }
</script>

<style>
  .gridMyStatus {
    grid-area: MS;
    background-color: lightyellow;
    min-height: 0;
  }
</style>

<div class="gridMyStatus">
  <h1>My Status</h1>
</div>
