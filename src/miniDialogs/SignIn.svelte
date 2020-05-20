<script>
  import { getSocket, initCommunication } from "../support/Communication";
  import { registerDump } from "../support/Dumper.js";
  import { onMount, afterUpdate } from "svelte";

  export let cb;

  let name = window.sessionStorage.getItem("name");
  let uuid = window.sessionStorage.getItem("uuid");
  let error = "";

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

    initCommunication();

    getSocket().emit(
      "ClientMessage",
      { msgType: "addPlayer", uuid: uuid, player: lname },
      function(data) {
        window.sessionStorage.setItem("uuid", data.uuid);
        window.sessionStorage.setItem("name", lname);
        document
          .getElementById("pupTag")
          .setAttribute("puptag", `signin.${data.uuid}`);
      }
    );
    cb();
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
</div>
