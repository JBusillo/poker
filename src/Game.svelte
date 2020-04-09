<script>
  import { config } from "./support/config";
  import PlayerStatus from "./PlayerStatus.svelte";
  import MyStatus from "./MyStatus.svelte";
  import GameStatus from "./GameStatus.svelte";
  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyActions from "./MyActions.svelte";
  import * as Communication from "./support/Communication";

  export let size;

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
    grid-gap: 5px;
    grid-template-areas:
      "PS TC GS"
      "PS MC GS"
      "gride MA MS";
  }

  @media (max-width: 999px) {
    .container {
      display: grid;
      height: 100vh;
      width: 100vw;
      grid-template-rows: 50fr 50fr 10fr;
      grid-template-columns: 10fr 70fr 30fr;
      column-gap: 1em;
      grid-template-areas:
        "SB TC MS"
        "SB MC MA"
        "SB GS MA"; /* only one line */
    }
  }
</style>

<main>
  <div class="container">
    <PlayerStatus {size} />
    <MyStatus {size} />
    <GameStatus {size} />
    <TableCards {size} />
    <MyCards {size} />
    <MyActions {size} />
  </div>
</main>
