<script>
  import { onMount } from "svelte";
  import { registerDump } from "../support/Dumper.js";
  import {
    selectedCards,
    discardEnabled,
    myActions,
    myCards
  } from "../support/Communication";

  export let me;

  let selected = [];

  // Bind to store
  onMount(() => {
    selectedCards.reset();
    discardEnabled.set(true);

    return registerDump(
      "Discard.svelte",
      me,
      selected,
      $discardEnabled,
      $selectedCards
    );
  });

  // Enable Selection for discard in PlayerCards
  // (there are no table cards, no need for specificity)
  // Tests are based on "rule" passed to dialog
  // The only valid action is "ok".
  function select(event) {
    let action = event.currentTarget.getAttribute("action");

    if (action === "ok") {
      let counts = selectedCards.getCounts();
      switch (me.rule) {
        case "1Card":
          if (counts.MyCards !== 1) return;
          break;
      }
    }

    $myCards.cards = $myCards.cards.filter(e => !$selectedCards.includes(e));
    discardEnabled.set(false);
    me.cb({ action, remainingCards: $myCards.cards });
    myActions.set({ type: "MyActions", miniDialog: "default" });
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

  .flexCol {
    display: flex;
    flex-direction: column;
  }

  .flexRow {
    display: flex;
    flex-direction: row;
  }
</style>

<div class="flexCol">
  <div class="flexRow">
    <button id="sc-ok" class="btn" action="ok" on:click={select}>OK</button>
  </div>
  <div>{me.prompt}</div>
</div>
