<script>
  import { setMyStatusCallback } from "./GameData";
  let myStatus = null;

  //once
  setMyStatusCallback(value => {
    myStatus = value;
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
