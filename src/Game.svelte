<script>
  import { onMount } from "svelte";
  import Table from "./Table.svelte";
  import SignIn from "./miniDialogs/SignIn.svelte";
  import { smallScreen } from "./support/Communication.js";

  let signedIn = false;

  onMount(() => {
    resize();
  });

  window.addEventListener("orientationchange", function() {
    resize();
  });

  function cbSignIn() {
    signedIn = true;
  }

  function resize() {
    let vwWidth = document.getElementById("woot").clientWidth;
    $smallScreen = vwWidth <= 640 ? true : false;
  }

  //window.localStorage.setItem("debug", "engine,socket.io*");
  window.localStorage.removeItem("debug");
</script>

<style>
  main {
    margin: 5px;
    background-color: antiquewhite;
    color: black;
    height: auto;
    width: auto;
  }

  .cardRed {
    font-family: "cards";
    font-size: 100px;
    color: red;
  }

  .cardBlack {
    font-family: "cards";
    font-size: 100px;
    color: black;
  }
</style>

<svelte:head>
  <link rel="stylesheet" href="/build/assets/custom.css" />
</svelte:head>

<main>
  <div id="woot">
    <!-- <div class="cardRed">&#127153;</div>
    <div class="cardBlack">&#127137;</div>
    <div class="cardRed">&#127169;</div>
    <div class="cardBlack">&#127185;</div>
    <div class="cardBlack">&#127237;</div> -->
    {#if signedIn}
      <div id="root" class="container">
        <Table />
      </div>
    {:else}
      <SignIn cb={cbSignIn} />
    {/if}
  </div>
</main>
