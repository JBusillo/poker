<script>
  import { onMount } from "svelte";
  import { beforeUpdate, afterUpdate } from "svelte";
  import { setGameStatusCb } from "./support/Communication";
  export let size;

  let gameStatus;

  onMount(() => {
    setGameStatusCb(value => {
      gameStatus = value;
    });
  });

  let autoscroll;
  let sdiv;

  let terminal = "";
  let buttons = [];
  let status = "Waiting for Players";

  // before each render
  beforeUpdate(() => {
    autoscroll =
      sdiv && sdiv.offsetHeight + sdiv.scrollTop > sdiv.scrollHeight - 20;
  });

  // after each render
  afterUpdate(() => {
    if (sdiv && autoscroll) sdiv.scrollTo(0, sdiv.scrollHeight);
  });

  $: {
    if (gameStatus) {
      if (gameStatus.status) {
        status = gameStatus.status;
      }

      if (gameStatus.message) {
        terminal = terminal + "\r\n" + gameStatus.message;
      }

      if (gameStatus.actions) {
        buttons = gameStatus.buttons;
      }
    }
  }
</script>

<style>
  .gridGameStatus {
    grid-area: GS;
    background-color: lightyellow;
    min-height: 0;
  }

  .gsStatusBox {
    color: black;
    background: chartreuse;
    width: auto;
    padding: 20px;
    margin: 20px;
    border-radius: 50px;
    display: inline-block;
    border: black;
    border-style: solid;
    font-size: 18px;
  }
  .gs_scroll_label {
    display: block;
  }
  .gs_scroll_label textarea {
    border: 0 none;
    margin: 0;
    outline: 0 none;
    padding: 0;
    width: 100%;
    height: 20vw;
    resize: both;
    overflow-y: auto !important;
    overflow-x: auto !important;
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

{#if size === 'L'}
  <div class="gridGameStatus">
    <h1>Game Status</h1>
    <div>
      <div class="gsStatusBox">{`Current Status: ${status}`}</div>
    </div>
    <div id="wrap">
      <label class="gs_scroll_label">
        <textarea bind:this={sdiv}>{terminal}</textarea>
      </label>
    </div>
    <div>
      {#each buttons as button}
        <button class="button1" type="button">{button.text}</button>
      {/each}
    </div>
  </div>
{/if}
