<script>
  import { onMount } from "svelte";
  import { registerDump } from "./support/Dumper.js";
  import {
    tablePlayers,
    gamePaused,
    myStatus,
    gameResults,
    smallScreen
  } from "./support/Communication";

  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyActions from "./MyActions.svelte";
  import InfoBar from "./InfoBar.svelte";
  import GameResults from "./GameResults.svelte";
  import PlayerStatus from "./PlayerStatus.svelte";
  import PlayerCards from "./PlayerCards.svelte";
  import PlayerShow from "./PlayerShow.svelte";

  let players = [];
  let myUuid = window.sessionStorage.getItem("uuid");

  onMount(() => {
    tablePlayers.subscribe(value => {
      if (value.type === "AddPlayer") {
        players = [...players, value.player];
        //vpu 8e54277b-7e4c-45fa-966a-822c2f5580f0 myuuid ca3894b2-5b97-4282-bc2d-d358f278acaf
        console.log(` vpu ${value.player.uuid} myuuid ${myUuid}`);
        if (value.player.uuid === myUuid) {
          $myStatus = value.player;
        }
      }
      if (value.type === "Players") {
        players = value.players;
      }
    });
    return registerDump("Table.svelte", players);
  });
</script>

<style>
  .overlay {
    display: flex;
    flex-direction: column;
    /* position: absolute;
    margin: 0; */
    padding: 0;
    width: auto;
    height: auto;
  }

  .theGrid {
    display: grid;
    grid-template-columns: minmax(max-content, 2fr) 2fr 2fr 5fr;
    grid-gap: 0px;
    /* justify-items: left; */
  }

  .flexRow {
    display: flex;
    flex-direction: row;
  }

  .flexCol {
    display: flex;
    flex-direction: column;
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

  .hide {
    display: none;
  }
</style>

<div class="overlay" pup="table">
  <InfoBar />
  {#if $gameResults && $gameResults.show === true}
    <GameResults results={$gameResults.results} />
  {/if}
  <div class="flexCol {$gamePaused ? 'hide' : ''}">
    <!-- Player -->
    <div class="theGrid">
      {#if $smallScreen}
        <MyActions />
        <MyCards />
        <div />
        <div />
        <TableCards />
        <div />
      {:else}
        <MyActions />
        <MyCards />
        <TableCards />
      {/if}
    </div>
    <!-- Players  -->
    <div class="flexCol">
      {#each players as player}
        <div class="theGrid">
          <PlayerStatus {player} />
          <div class="flexRow midbox">
            <PlayerCards uuid={player.uuid} />
          </div>
          <div class="flexRow rightbox">
            <PlayerShow uuid={player.uuid} />
          </div>
        </div>
      {/each}
    </div>
  </div>

</div>
