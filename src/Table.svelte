<script>
  import { onMount, beforeUpdate, tick } from "svelte";
  import { getSocket, setTableCb } from "./support/Communication";
  import { getCard } from "./support/Cards";
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
  let players = []; // only contains uuid
  let me;

  onMount(() => {
    console.log("Table.svelte onMount");
    setTableCb(action => {
      // if (action.type === "AddPlayer") {
      //   console.log("in AddPlayer");
      //   players.push(action.fields.uuid);
      //   players = players;
      // }
      if (action.type === "Players") {
        me = action.players.find(
          e => e.uuid === window.sessionStorage.getItem("uuid")
        );
        players = action.players;
      }
    });
  });

  $: players = players;
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

<div class="overlay">
  <GameMessage />
  <div class="theGrid">
    <!-- My Hand + Table Cards  -->
    <div>ME!</div>
    <MyLine {me} />
    <!-- Header for Players at Table  -->
    <div>Name</div>
    <div>Dealt Cards</div>
    <div>Played Cards</div>
    <div>Other Stuff</div>
    <!--  -->
    <PlayerLine {players} {showDown} />
  </div>

</div>
