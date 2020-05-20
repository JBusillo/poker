<script>
  import { getSocket } from "../support/Communication.js";
  import { dumper } from "../support/Dumper.js";

  export let adminCb;

  function handleClick(event) {
    switch (event.currentTarget.id) {
      case "restart":
        doRestart();
        break;
      case "dump":
        dumper();
        adminCb();
        break;
      case "pause":
        getSocket().emit("ClientMessage", { msgType: "pauseGame" });
        adminCb();
        break;
      case "resume":
        getSocket().emit("ClientMessage", { msgType: "resumeGame" });
        adminCb();
        break;
      case "cancel":
        adminCb();
        break;
    }
  }

  function doRestart() {
    if (confirm("Are you sure you want to restart??")) {
      getSocket().emit("ClientMessage", { msgType: "abort" });
    }
  }
</script>

<style>
  .theGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0px;
    /* justify-items: left; */
  }

  .btn {
    background-color: cadetblue;
    height: 50px;
    width: 100px;
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 0px;
  }
</style>

<div class="theGrid">
  <div>Restart the server. All player information will be lost.</div>
  <button id="restart" class="btn" on:click={handleClick}>Restart</button>
  <div>Dump user state for debugging. No effect on game.</div>
  <button id="dump" class="btn" on:click={handleClick}>Dump</button>
  <div>Pause game. Game will pause at an appropriate breakpoint.</div>
  <button id="pause" class="btn" on:click={handleClick}>Pause</button>
  <div>Resume game. Game will resume. Player state is not affected.</div>
  <button id="resume" class="btn" on:click={handleClick}>Resume</button>
  <div>Cancel this dialog.</div>
  <button id="cancel" class="btn" on:click={handleClick}>Cancel</button>
</div>
