<script>
  import { onMount } from "svelte";
  import { config } from "./support/config";
  import { setMyActionsCb } from "./support/Communication";
  import { getSocket } from "./support/Communication";
  let myActions = { buttons: [] };

  onMount(() => {
    setMyActionsCb(value => {
      myActions = value;
    });
  });

  async function HandleClick(e) {
    getSocket().emit(
      "ClientMessage",
      { msgType: "doButton", bguid: e.target.getAttribute("bguid") },
      function(data) {
        console.log(data);
      }
    );
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
