<script>
  import SignIn from "./SignIn.svelte";
  import Game from "./Game.svelte";
  let cbSignIn = () => {
    signedIn = true;
  };
  let signedIn = false;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  {#if signedIn}
    <Game />
  {:else}
    <SignIn {cbSignIn} />
  {/if}
</main>
