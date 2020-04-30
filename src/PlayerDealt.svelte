<script>
  import { getCard } from "./support/Cards";
  import PlayerStatus from "./PlayerStatus.svelte";
  import { onMount } from "svelte";
  import { setPlayerDealtCb } from "./support/Communication";
  export let PlayerDealt;

  onMount(() => {
    console.log("PlayerDealt.svelte onMount");
    setPlayerDealtCb(value => {
      PlayerDealt = value;
      console.log(`PlayerDealtCb ${JSON.stringify(PlayerDealt)}`);
    });
  });

  $: console.log(`cards   ${JSON.stringify(PlayerDealt.cards)}`);
  $: PlayerDealt = PlayerDealt;
</script>

<style>
  .card {
    max-width: 72px;
    max-height: 110px;
    height: auto;
    width: auto;
  }
</style>

{#each PlayerDealt.cards as cp}
  <div class="card">
    <svg
      class="svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <image href={getCard(cp)} height="110" width="72" />
    </svg>
  </div>
{/each}
