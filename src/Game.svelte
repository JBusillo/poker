<script>
  import { onMount } from "svelte";
  import { config } from "./support/config";
  import PlayerStatus from "./PlayerStatus.svelte";
  import MyStatus from "./MyStatus.svelte";
  import GameStatus from "./GameStatus.svelte";
  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyActions from "./MyActions.svelte";
  import Dialog from "./dialogs/Dialog.svelte";
  import {
    initCommunication,
    getSocket,
    setDialogCb,
    setDialog
  } from "./support/Communication.js";
  import log from "roarr";

  let size;
  let dialogData = null;
  let dialogCallback = null;
  let uuid = window.sessionStorage.getItem("uuid");

  onMount(() => {
    // Ensure that `globalThis.ROARR` is configured.
    globalThis.ROARR = globalThis.ROARR || {};
    globalThis.ROARR.write = message => {
      console.log(JSON.parse(message));
    };
    log.debug(`Game onMount`);
    // Register Dialog Callback
    setDialogCb((data, cb) => {
      log.debug(`In Game/setDialogCb`);
      dialogData = data;
      dialogCallback = cb;
    });
    // set  initial dialog for SignIn
    setDialog({ dialog: "SignIn" });
    // Ctrl-C will abort server
    document.body.addEventListener(
      "keydown",
      function(e) {
        e = e || window.event;
        var key = e.which || e.keyCode; // keyCode detection
        var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false; // ctrl detection

        if (key == 86 && ctrl) {
          console.log("Ctrl + V Pressed !");
        } else if (key == 67 && ctrl) {
          getSocket().emit("ClientMessage", { msgType: "abort" });
        }
      },
      false
    );

    CalcSize();
  });

  // CalcSize -- returns L or S depending on window size  (and eventually M for Medium?)
  function CalcSize() {
    let maxwidth = Math.max(window.innerWidth, window.innerHeight);
    if (maxwidth >= 1000) {
      // Large desktop size
      size = "L";
    } else if (maxwidth >= 500) {
      // Tablet size
      size = "S";
    } else {
      // Smartphone size
      size = "S";
    }
  }

  // Callback to end a fullscreen dialog
  let endDialog = data => {
    if (data) console.log(data.return);
    if (data && data.return) {
      setDialog(data.return.data, data.return.callback);
    } else dialogData = null;
  };
</script>

<style>
  main {
    background-color: wheat;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    color: black;
  }

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
        "TC TC MS"
        "MC MC GS"
        "SB MA MA"; /* only one line */
    }
  }
</style>

<svelte:window on:resize={CalcSize} />

<main>
  <div class="container">

    <PlayerStatus {size} />
    <MyStatus />
    <GameStatus {size} />
    <TableCards />
    <MyCards />
    <MyActions />
    {#if dialogData}
      <Dialog {endDialog} {dialogData} {dialogCallback} />
    {/if}
  </div>
</main>
