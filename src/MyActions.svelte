<script>
  import { config } from "./config";
  import { setMyActionsCallback } from "./GameData";
  let myActions = { buttons: [] };

  //once
  setMyActionsCallback(value => {
    myActions = value;
  });

  //   $: {
  //     if (myActions && myActions.buttons) {
  //       myActions.buttons.forEach(el => {
  //         let id = document.getElementById(el.id);
  //         id.removeEventListener("click", HandleClick);
  //         id.addEventListener("click", HandleClick);
  //       });
  //     }
  //   }

  async function HandleClick(e) {
    console.log("in HandleClick");
    console.log(e);
    let url = `${config.server}/doButton?bguid=${e.target.getAttribute(
      "bguid"
    )}`;
    fetch(url)
      .then(res => res.json())
      .catch(err => {
        console.log("There was an error");
        console.log(err);
      });
  }
</script>

<style>
  .gridMyActions {
    grid-area: MA;
    background-color: lightyellow;
    min-height: 0;
  }

  .button1 {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #60a3bc;
    padding: 20px;
    border-radius: 50px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
  }

  .button1:hover {
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
    transition: all 0.4s ease 0s;
  }
</style>

<div class="gridMyActions">
  <h1>My Actions</h1>
  {#each myActions.buttons as button}
    <button
      id={button.id}
      bguid={button.bguid}
      on:click={HandleClick}
      class="button1"
      type="button">
      {button.text}
    </button>
  {/each}

</div>
