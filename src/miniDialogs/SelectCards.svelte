<script>
  import { onMount, beforeUpdate } from "svelte";
  import {
    selectedCards,
    selectEnabled,
    myActions
  } from "../support/Communication";

  export let me;

  let selected = [];

  // Bind to store
  onMount(() => {
    console.log("Select Mounted");
    selectedCards.subscribe(value => {
      selected = value;
    });
    return () => console.log("Select Destroyed");
  });

  beforeUpdate(() => {
    selectedCards.reset();
    selectEnabled.set(true);
  });

  // Enable Selection in PlayerCards and TableCards
  // Test to ensure that 5 cards have been selected
  function select(event) {
    let action = event.currentTarget.getAttribute("action");
    if (action === "fold" || selected.length === 5) {
      selectEnabled.set(false);
      me.cb({ action, cards: selected });
      myActions.set({ type: "MyActions", miniDialog: "default" });
    }
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
</style>

<div>
  <button class="btn" action="ok" on:click={select}>OK</button>
  <button class="btn" action="fold" on:click={select}>Fold</button>
</div>
