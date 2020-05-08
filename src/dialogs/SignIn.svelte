<script>
  import { config } from "../support/config";
  import {
    getSocket,
    initCommunication,
    infoName
  } from "../support/Communication";
  export let endDialog;
  // export let dialogData;
  // export let dialogCallback;

  let name = window.sessionStorage.getItem("name");
  let uuid = window.sessionStorage.getItem("uuid");
  let error = "";

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
      }
    );
    endDialog();
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

<div class="overlay" pup="signin">
  <h1>Sign in to Poker</h1>
  {#if uuid}
    <div>
      <div>Are you {name}?</div>
      <button on:click={addPlayer}>Yes</button>
      <button pup="signin-no" on:click={resetPlayer}>No</button>
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
