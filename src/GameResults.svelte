<script>
  export let results;

  function fAmount(amt) {
    return `${(amt / 100).toFixed(2)}`;
  }
</script>

<style>
  .myGrid {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr 3fr;
    grid-gap: 10px;
    border-style: solid;
    border-radius: 4px;
    background-color: cadetblue;
    /* justify-items: left; */
  }

  .bold {
    font-weight: bold;
  }
</style>

<div class="myGrid">
  <div class="bold">Player</div>
  <div class="bold">Hand</div>
  <div class="bold">Hand Value Code</div>
  <div class="bold">Amount Won</div>
  <div class="bold">Notes</div>

  {#each results as item}
    <div>{item.player}</div>
    <div>{item.hand}</div>
    <div>{item.handValue}</div>
    <div>{fAmount(item.won)}</div>
    <div>{item.message}</div>
  {/each}
</div>
