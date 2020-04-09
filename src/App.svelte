<script>
  import { onMount } from "svelte";
  import SignIn from "./SignIn.svelte";
  import Game from "./Game.svelte";

  let size;
  let cbSignIn;
  let signedIn = false;

  onMount(() => {
    cbSignIn = () => {
      signedIn = true;
    };
    size = CalcSize;
  });

  function CalcSize() {
    let maxwidth = Math.max(window.innerWidth, window.innerHeight);
    if (maxwidth >= 1000) return "L";
    else if (maxwidth >= 500) return "S";
    else return "S";
  }
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
</style>

<svelte:window on:resize={CalcSize} />

<main>
  {#if signedIn}
    <Game {size} />
  {:else}
    <SignIn {cbSignIn} />
  {/if}
</main>
