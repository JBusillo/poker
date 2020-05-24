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

  // CalcSize -- returns L or S depending on window size  (and eventually M for Medium?)
  // function CalcSize() {
  //   let maxwidth = Math.max(window.innerWidth, window.innerHeight);
  //   if (maxwidth >= 1000) {
  //     // Large desktop size
  //     size = "L";
  //   } else if (maxwidth >= 500) {
  //     // Tablet size
  //     size = "S";
  //   } else {
  //     // Smartphone size
  //     size = "S";
  //   }
  // }
</script>

<style>
  main {
    margin: 5px;
    background-color: antiquewhite;
    color: black;
    height: auto;
    width: auto;
  }
</style>

<!-- <svelte:window on:resize={CalcSize} /> -->
<main>
  <div id="woot">
    {#if signedIn}
      <div id="root" class="container">
        <Table />
      </div>
    {:else}
      <SignIn cb={cbSignIn} />
    {/if}
  </div>
</main>
