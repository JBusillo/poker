<script>
  import { beforeUpdate, onMount } from "svelte";
  import { myActions, setDialog } from "../support/Communication";
  import Raise from "./Raise.svelte";

  export let me;

  let buttons = [];
  let raiseAmount = 0;
  let paidAmount = 0;
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
    raiseDialog = false;
    raiseAmount = 0;
    paidAmount = 0;
  });

  beforeUpdate(() => {
    pupdata = (me.allowRaise ? "1" : "2") + me.numberRound.toString();

    buttons = [];
    let desc = `Raise amount is ${fAmount(me.sumRaises - me.paidAmount)}`;

    // We're in the first Rotation
    if (me.allowRaise) {
      if (me.sumRaises > 0) {
        buttons.push({ action: "see", desc: "See" });
        buttons.push({ action: "raise", desc: "Raise" });
        buttons.push({ action: "fold", desc: "Fold" });
      } else {
        buttons.push({ action: "check", desc: "Check" });
        buttons.push({ action: "raise", desc: "Raise" });
      }
    } else {
      buttons.push({ action: "see", desc: "See" });
      buttons.push({ action: "fold", desc: "Fold" });
    }
    console.log(`Buttons   ${JSON.stringify(buttons)}`);
  });

  function fAmount(amt) {
    return `${(amt / 100).toFixed(2)}`;
  }

  function handleAction(event) {
    let action = event.currentTarget.getAttribute("action");

    if (action === "raise") {
      raiseDialog = true;
    } else {
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
