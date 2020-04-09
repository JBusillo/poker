<script>
  import { setPlayerStatusCb } from "./support/Communication";
  import { onMount } from "svelte";

  let playerStatus;

  onMount(() => {
    setPlayerStatusCb(value => {
      playerStatus = value;
    });
  });
</script>

<style>
  .gridPlayerStatus {
    grid-area: PS;
    background-color: lightgrey;
  }

  .playerGrid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0px;
  }

  .playerGridItem {
    border: 2px;
    border-style: solid;
  }
</style>

<div class="gridPlayerStatus">
  <h1>Players</h1>
  <div>
    {#if playerStatus}
      <div>
        <div class="playerGrid">
          <div>Name</div>
          <div>Money</div>
          <div>Winnings</div>
          <div>Buy-In</div>
          <div>Status</div>
          {#each playerStatus as p}
            <div class="playerGridItem">{p.name}</div>
            <div class="playerGridItem">{p.money}</div>
            <div class="playerGridItem">{p.winnings}</div>
            <div class="playerGridItem">{p.buyin}</div>
            <div class="playerGridItem">{p.status}</div>
          {/each}

        </div>
      </div>
    {:else}
      <div>No Players...</div>
    {/if}
  </div>
</div>
