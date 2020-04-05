<script>
  import { config } from "./config";

  import PlayerStatus from "./PlayerStatus.svelte";
  import MyStatus from "./MyStatus.svelte";
  import GameStatus from "./GameStatus.svelte";
  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyActions from "./MyActions.svelte";
  import * as Communication from "./Communication";

  Communication.initBroadcastComm();
  let uuid = window.sessionStorage.getItem("uuid");
  Communication.initUserComm(uuid);
  let url = `${config.server}/playerReady?uuid=${uuid}`;
  fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.status === "Error") {
        route("/");
      }
    })
    .catch(err => {
      console.log("There was an error");
      console.log(err);
    });
</script>

<style>
  .container {
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 2fr 1fr;
    column-gap: 3em;
    grid-template-areas:
      "PS TC GS"
      "PS MC GS"
      "gride MA MS";
  }
</style>

<main>
  <div id="game">
    <div>
      <div class="container">
        <PlayerStatus />
        <MyStatus />
        <GameStatus />
        <TableCards />
        <MyCards />
        <MyActions />
      </div>
    </div>
  </div>
</main>
