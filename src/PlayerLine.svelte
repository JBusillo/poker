<script>
  import { onMount, beforeUpdate } from "svelte";
  import { getCard } from "./support/Cards";
  import PlayerStatus from "./PlayerStatus.svelte";
  import PlayerDealt from "./PlayerDealt.svelte";
  import PlayerShow from "./PlayerShow.svelte";
  import { setPlayerLineCb } from "./support/Communication";
  export let players;
  export let showDown;

  let playerLine;

  onMount(() => {
    console.log("PlayerLine.svelte onMount");

    setPlayerLineCb(value => {
      playerLine = value;
    });
  });

  beforeUpdate(() => {
    console.log(`Players   ${JSON.stringify(players)}`);
  });
</script>

<style>
  .flexRow {
    display: flex;
    flex-direction: row;
  }

  .midbox {
    margin-top: 3px;
    border-style: solid none solid none;
    border-color: black;
  }

  .rightbox {
    margin-top: 3px;
    border-style: solid solid solid none;
    border-radius: 0 3px 3px 0;
  }
</style>

{#each players as player}
  <PlayerStatus {player} />
  <div class="flexRow midbox">
    <PlayerDealt PlayerDealt={{ action: 'PlayerDealt', cards: [] }} />
  </div>
  {#if showDown}
    <div class="flexRow midbox">
      <PlayerShow {player} />
    </div>
  {:else}
    <div class="midbox" />
  {/if}
  <div class="rightbox" />
{/each}
