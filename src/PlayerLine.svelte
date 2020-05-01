<script>
  import { onMount, beforeUpdate, tick } from "svelte";
  import { getCard } from "./support/Cards";
  import PlayerStatus from "./PlayerStatus.svelte";
  import PlayerDealt from "./PlayerDealt.svelte";
  import PlayerShow from "./PlayerShow.svelte";
  import { setPlayerLineCb } from "./support/Communication";
  export let player;
  export let showDown;

  let playerLine;

  onMount(() => {
    console.log("PlayerLine.svelte onMount");
    setPlayerLineCb(value => {
      playerLine = value;
    });
  });

  beforeUpdate(async () => {
    await tick();
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

<!-- {#if players.length === 0}
  <PlayerStatus uuid={null} />
  <PlayerDealt />
  <PlayerShow />
  <div />
{/if} -->

<PlayerStatus {player} />
<div class="flexRow midbox">
  <PlayerDealt {player} />
</div>
{#if showDown}
  <div class="flexRow midbox">
    <PlayerShow {player} />
  </div>
{:else}
  <div class="midbox" />
{/if}
<div class="rightbox" />
