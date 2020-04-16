<script>
  import { config } from "../support/config";
  import { getSocket, initCommunication } from "../support/Communication";
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
    let lname = name ? name : document.getElementById("name").value;
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

    initCommunication();

    getSocket().emit(
      "ClientMessage",
      { msgType: "addPlayer", uuid: uuid, player: lname },
      function(data) {
        console.log(`Callback/SignIn/AddPlayer data: ${JSON.stringify(data)}`);
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

<main>
  <div class="overlay">
    <h1>Sign in to Poker</h1>
    {#if uuid}
      <div>
        <div>Are you {name}?</div>
        <button on:click={addPlayer}>Yes</button>
        <button on:click={resetPlayer}>No</button>
      </div>
    {:else}
      <div>
        <div>
          What's your name, pinche güey?
          <input
            id="name"
            type="text"
            on:keyup={e => {
              if (['Enter', 'NumpadEnter'].includes(e.code)) {
                addPlayer();
              }
            }} />
          <div class="error">{error}</div>
        </div>
        <button on:click={addPlayer}>Add Player</button>
      </div>
    {/if}
  </div>
</main>
