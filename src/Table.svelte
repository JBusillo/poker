<script>
  import { onMount, beforeUpdate, tick } from "svelte";
  import { getSocket, setTableCb } from "./support/Communication";
  import { getCard } from "./support/Cards";
  import { getMe } from "./Globals.svelte";
  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyLine from "./MyLine.svelte";
  import PlayerLine from "./PlayerLine.svelte";
  import GameMessage from "./GameMessage.svelte";

  let showDown = false;
  let selectedCards = [];
  let selectCount = 0;
  let selectMine = 0;
  let allCards = [];
  let players = [];
  let me; // index of me within players

  onMount(async () => {
    players = [];
    setTableCb(action => {
      if (action.type === "AddPlayer") {
        players = [...players, action.player];

        if (!me) {
          me = players.find(
            e => e.uuid === window.sessionStorage.getItem("uuid")
          );
        }
      }
      if (action.type === "Players") {
        players = action.players;
      }
    });
    // await tick();
  });

  beforeUpdate(async () => {});
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
</style>

<div class="overlay" pup="table">
  <GameMessage />
  <div class="theGrid">
    <!-- My Hand + Table Cards  -->
    <div>ME!</div>
    <MyLine />
    <!-- Header for Players at Table  -->
    <div>Name</div>
    <div>Dealt Cards</div>
    <div>Played Cards</div>
    <div>Other Stuff</div>
    <!--  -->
    {#each players as player}
      <PlayerLine {player} {showDown} />
    {/each}
  </div>

</div>
