<script>
  import { getSocket, initCommunication } from "../support/Communication";
  import { registerDump } from "../support/Dumper.js";
  import { onMount, afterUpdate } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  export let cb;

  let name = window.sessionStorage.getItem("name");
  let uuid = window.sessionStorage.getItem("uuid");
  let error = "";
  let userAgent = navigator.userAgent;

  onMount(() => {
    return registerDump("SignIn.svelte", name, uuid, error);
  });

  afterUpdate(() => {
    if (uuid === null) document.getElementById("sg-name").focus();
  });

  function resetPlayer() {
    name = null;
    uuid = null;
  }

  function addPlayer() {
    let lname = name ? name : document.getElementById("sg-name").value;
    if (!lname) {
      error = "You have to specify a name, estúpido!";
      return;
    }
    if (lname.trim().length < 2) {
      error =
        "Come on, pendejo!  You gotta have at least two letters in your name!";
      return;
    }
    if (lname.trim().length > 10) {
      error =
        "Hey cabrón!  None of those commie names with more than 10 letters!";
      return;
    }

    document.title = lname;
    if (!uuid) uuid = uuidv4();
    window.sessionStorage.setItem("uuid", uuid);
    window.sessionStorage.setItem("name", lname);

    initCommunication();

    getSocket().emit(
      "ClientMessage",
      { msgType: "addPlayer", uuid: uuid, player: lname },
      function() {
        document
          .getElementById("pupTag")
          .setAttribute("puptag", `signin.${uuid}`);
      }
    );
    cb();
    document.documentElement.requestFullScreen();
  }
</script>

<style>
  .overlay {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .error {
    color: red;
    font-weight: bold;
  }

  .cardRed {
    font-size: 100px;
    color: red;
  }

  .cardBlack {
    font-size: 100px;
    color: black;
  }

  .flexRow {
    display: flex;
    flex-direction: row;
  }
  .flexCol {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="overlay" id="sg-dialog">
  <h1>Sign in to Poker</h1>
  {#if uuid}
    <div>
      <div>Are you {name}?</div>
      <button on:click={addPlayer}>Yes</button>
      <button id="sg-no" on:click={resetPlayer}>No</button>
    </div>
  {:else}
    <div>
      <div>
        What's your name?
        <input
          id="sg-name"
          type="text"
          on:keyup={e => {
            if (['Enter', 'NumpadEnter'].includes(e.code)) {
              addPlayer();
            }
          }} />
        <div class="error">{error}</div>
      </div>
      <button id="sg-signin" on:click={addPlayer}>Add Player</button>
    </div>
  {/if}
  <div class="flexCol">
    <div class="flexRow">
      <div class="cardRed">&#127153;</div>
      <div class="cardBlack">&#127137;</div>
      <div class="cardRed">&#127169;</div>
      <div class="cardBlack">&#127185;</div>
    </div>
    <div>{userAgent}</div>
  </div>
</div>
