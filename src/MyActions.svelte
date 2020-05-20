<script>
  import { onMount } from "svelte";
  import { registerDump } from "./support/Dumper.js";
  import { infoChips } from "./support/Communication";
  import SelectCards from "./miniDialogs/SelectCards.svelte";
  import Betting from "./miniDialogs/Betting.svelte";
  import BuyIn from "./miniDialogs/BuyIn.svelte";
  import Ante from "./miniDialogs/Ante.svelte";
  import Dealer from "./miniDialogs/Dealer.svelte";
  import Discard from "./miniDialogs/Discard.svelte";
  import { getSocket, myActions, myStatus } from "./support/Communication";

  //  const COMPONENT_NAME = "MyActions.svelte";
  let me = null;
  let buttons = [];
  let localMiniDialog = null;
  let message = null;

  $: {
    createButtons();
    buttons = buttons;
  }

  onMount(() => {
    myActions.subscribe(value => {
      me = value;
      createButtons();
      return registerDump("MyActions.svelte", me, buttons, localMiniDialog);
    });
  });

  function createButtons() {
    buttons = [];
    message = null;
    if (me && me.action) {
      switch (me.action) {
        case "Initial":
          if (!me.gameInit) {
            buttons.push({ id: "ma-begin", desc: "Begin" });
          }
          if ($infoChips < 1000) {
            buttons.push({ id: "ma-buyin", desc: "Buy In" });
          }
          buttons = buttons;
          break;
        case "Ready":
          // if (me.isOnBreak) {
          //   buttons.push({ id: "ma-offbreak", desc: "Return from Break" });
          // }
          // buttons = buttons;
          break;
        case "NewGame":
          if (!$myStatus.isOnBreak && !$myStatus.isOnBreakNextRound) {
            buttons.push({ id: "ma-newgame", desc: "New Game!!" });
          }
          if ($myStatus.chips < 1000) {
            buttons.push({ id: "ma-buyin", desc: "Buy In" });
          }
          buttons = buttons;
          break;
        default:
          console.log(`Invalid action   ${JSON.stringify(me)}`);
      }
      if ($myStatus.isOnBreak || $myStatus.isOnBreakNextRound) {
        buttons.push({ id: "ma-offbreak", desc: "Resume" });
        message = "Press Resume to play in next round";
      } else {
        buttons.push({ id: "ma-onbreak", desc: "Take Break" });
      }
    }
    buttons = buttons;
  }

  function handleClick(event) {
    let id = event.currentTarget.id;
    switch (id) {
      case "ma-buyin":
        localMiniDialog = "BuyIn";
        break;
      case "ma-begin":
        getSocket().emit("ClientMessage", { msgType: "beginTable" });
        break;
      case "ma-newgame":
        getSocket().emit("ClientMessage", { msgType: "startNewRound" });
        break;
      case "ma-offbreak":
        getSocket().emit(
          "ClientMessage",
          { msgType: "goOffBreak" },
          function() {
            createButtons();
          }
        );
        break;
      case "ma-onbreak":
        getSocket().emit("ClientMessage", { msgType: "goOnBreak" }, function() {
          createButtons();
        });
        break;
    }
  }

  function buyInCb() {
    localMiniDialog = null;
    createButtons();
  }
</script>

<style>
  .btn {
    background-color: cadetblue;
    height: 50px;
    width: 100px;
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 0px;
  }

  .flexRow {
    display: flex;
    flex-direction: row;
  }

  .flexCol {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="flexCol">

  <div class="flexRow">
    {#if localMiniDialog}
      {#if localMiniDialog === 'BuyIn'}
        <BuyIn cb={buyInCb} />
      {/if}
    {:else if me && me.miniDialog}
      {#if me && me.miniDialog === 'SelectCards'}
        <SelectCards {me} />
      {/if}
      {#if me && me.miniDialog === 'Betting'}
        <Betting {me} />
      {/if}
      {#if me && me.miniDialog === 'Ante'}
        <Ante {me} />
      {/if}
      {#if me && me.miniDialog === 'Dealer'}
        <Dealer {me} />
      {/if}
      {#if me && me.miniDialog === 'Discard'}
        <Discard {me} />
      {/if}
      {#if me && me.miniDialog === 'default'}
        <div />
      {/if}
    {:else if buttons}
      {#each buttons as button}
        <button id={button.id} class="btn" on:click={handleClick}>
          {button.desc}
        </button>
      {/each}
    {/if}
  </div>
  {#if message}
    <div>{message}</div>
  {/if}
</div>
