<script>
  import { onMount } from "svelte";
  import { config } from "./support/config";
  import Table from "./Table.svelte";
  import Dialog from "./dialogs/Dialog.svelte";
  import {
    initCommunication,
    getSocket,
    setDialogCb,
    setDialog
  } from "./support/Communication.js";

  let size;
  let dialogData = null;
  let dialogCallback = null;
  let uuid = window.sessionStorage.getItem("uuid");

  //window.localStorage.setItem("debug", "engine,socket.io*");
  window.localStorage.removeItem("debug");

  onMount(() => {
    // Register Dialog Callback
    setDialogCb((data, cb) => {
      dialogData = data;
      dialogCallback = cb;
    });

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
    margin: 5px;
    background-color: antiquewhite;
    /* height: 100vh; */
    /* width: 100vw;
    position: absolute;
    top: 0;
    left: 0; */
    color: black;
  }
</style>

<svelte:window on:resize={CalcSize} />

<main>
  <div class="container">
    <Table />
    {#if dialogData}
      <Dialog {endDialog} {dialogData} {dialogCallback} />
    {/if}
  </div>
</main>
