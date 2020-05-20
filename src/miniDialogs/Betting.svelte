<script>
  import { beforeUpdate, onMount } from "svelte";
  import { registerDump } from "../support/Dumper.js";
  import { myActions } from "../support/Communication";
  import Raise from "./Raise.svelte";

  export let me;

  let buttons = [];
  let raiseAmount = 0;
  let pupdata = "";
  let raiseDialog = false;

  const raiseCb = result => {
    raiseDialog = false;
    if (result.action === "raise") {
      me.cb({ action: result.action, raiseAmount: result.raiseAmount });
      myActions.set({ type: "MyActions", miniDialog: "default" });
    }
  };

  onMount(() => {
    return registerDump(
      "Betting.svelte",
      me,
      buttons,
      raiseAmount,
      pupdata,
      raiseDialog
    );
  });

  beforeUpdate(() => {
    pupdata = (me.allowRaise ? "1" : "2") + me.numberRound.toString();

    buttons = [];

    // We're in the first Rotation
    if (me.allowRaise) {
      if (me.sumRaises > 0) {
        if (me.chips < me.sumRaises) {
          buttons.push({ action: "side-pot", desc: "All In" });
        } else {
          buttons.push({ action: "see", desc: "See" });
          buttons.push({ action: "raise", desc: "Raise" });
          buttons.push({ action: "allin", desc: "All In" });
        }
        buttons.push({ action: "fold", desc: "Fold" });
      } else {
        buttons.push({ action: "check", desc: "Check" });
        buttons.push({ action: "raise", desc: "Raise" });
        buttons.push({ action: "allin", desc: "All In" });
      }
    } else {
      if (me.chips < me.sumRaises) {
        buttons.push({ action: "side-pot", desc: "All In" });
      } else {
        buttons.push({ action: "see", desc: "See" });
      }
      buttons.push({ action: "fold", desc: "Fold" });
    }
  });

  function handleAction(event) {
    let action = event.currentTarget.getAttribute("action");

    switch (action) {
      case "raise":
        raiseDialog = true;
        break;
      case "allin":
        if (confirm("Are you sure you want to go All In??")) {
          raiseCb({ action: "raise", raiseAmount: me.chips });
          myActions.set({ type: "MyActions", miniDialog: "default" });
        }
        break;
      default:
        me.cb({ action, raiseAmount });
        myActions.set({ type: "MyActions", miniDialog: "default" });
    }
  }
</script>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .container > * {
    margin: 10px;
  }

  .flexRow {
    display: flex;
    flex-direction: row;
  }

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

<div class="wrap" pup="dlg-bet" {pupdata}>
  <div class="container">
    {#if raiseDialog}
      <Raise {raiseCb} {me} />
    {:else}
      <div class="flexRow">
        {#each buttons as b}
          <button
            action={b.action}
            id={b.action}
            class="btn"
            on:click={handleAction}>
            {b.desc}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>
