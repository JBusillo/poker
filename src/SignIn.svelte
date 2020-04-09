<script>
  import { config } from "./support/config";
  export let cbSignIn;

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
    let url =
      `${config.server}/addPlayer?player=${lname}` +
      (uuid ? `&uuid=${uuid}` : "");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        window.sessionStorage.setItem("uuid", data.uuid);
        window.sessionStorage.setItem("name", lname);
        cbSignIn();
      })
      .catch(err => {
        console.log("There was an error");
        console.log(err);
      });
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
        <button id="signin" on:click={addPlayer}>Add Player</button>
      </div>
    {/if}
  </div>
</main>
