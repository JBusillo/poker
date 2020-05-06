<script>
  import { onMount } from "svelte";
  import { tablePlayers } from "./support/Communication";
  import { getCard } from "./support/Cards";
  import { getMe } from "./Globals.svelte";

  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyActions from "./MyActions.svelte";
  import GameMessage from "./GameMessage.svelte";
  import PlayerStatus from "./PlayerStatus.svelte";
  import PlayerCards from "./PlayerCards.svelte";
  import PlayerShow from "./PlayerShow.svelte";

  let players = [];

  let showDown = false;

  // for card selection -- not used yet
  let selectedCards = [];
  let selectCount = 0;
  let selectMine = 0;
  let allCards = [];

  onMount(() => {
    tablePlayers.subscribe(value => {
      if (value.type === "AddPlayer") {
        players = [...players, value.player];
      }
      if (value.type === "Players") {
        players = value.players;
      }
    });
  });
</script>

<style>
  .overlay {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .theGrid {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 0px;
    /* justify-items: left; */
  }

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

<div class="overlay" pup="table">
  <GameMessage />
  <div class="theGrid">
    <!-- Player -->
    <MyActions />
    <MyCards />
    <TableCards />
    <div />
    <!-- Players  -->
    {#each players as player}
      <PlayerStatus {player} />
      <div class="flexRow midbox">
        <PlayerCards cards={player.cards} uuid={player.uuid} />
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
  </div>

</div>
