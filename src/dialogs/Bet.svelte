<script>
  import { getSocket } from "../support/Communication";
  import { beforeUpdate, onMount } from "svelte";
  export let endDialog;
  export let dialogData;
  export let dialogCallback;
  let errorMessage = "";

  // dialogData.dialog = "Bet"
  // dialogData.chips = player chip amount (available to bet)
  // dialogData.sumRaises = total raise amount for this round
  // dialogData.alreadyPaid = amount already paid towards sumRaises
  // dialogData.allowRaise = allow player to raise (Rotation 1)

  //result.action = check/fold/see/raise/see-raise (side-pot?)
  //result.raiseAmount = Raise amount.  only applies to raise and see-raise

  let buttons = [];
  let raiseAmount = 0;
  let paidAmount = 0;
  let pupdata = "";

  onMount(() => {
    raiseAmount = 0;
    paidAmount = 0;
  });

  function fAmount(amt) {
    return `${(amt / 100).toFixed(2)}`;
  }

  beforeUpdate(() => {
    pupdata =
      (dialogData.allowRaise ? "1" : "2") + dialogData.numberRound.toString();

    buttons = [];
    // We're in the first Rotation
    if (dialogData.allowRaise) {
      console.log("first rotation");
      if (dialogData.sumRaises > 0) {
        buttons.push({
          cls: "btn",
          action: `see`,
          desc: `See the raise: Pay ${fAmount(dialogData.sumRaises)}`
        });
        buttons.push({
          cls: "btn hide",
          action: "see-raise",
          desc: `See AND raise: Pay ${fAmount(
            dialogData.sumRaises
          )} plus ${fAmount(raiseAmount)}`
        });
        buttons.push({ cls: "btn", action: "fold", desc: "Fold" });
      } else {
        buttons.push({ cls: "btn", action: "check", desc: "Check" });
        buttons.push({ cls: "btn hide", action: "raise", desc: "Raise" });
      }
    } else {
      // Second Rotation can only fold or see
      console.log("second rotation");
      buttons.push({ cls: "btn", action: "see", desc: "See" });
      buttons.push({ cls: "btn", action: "fold", desc: "Fold" });
    }
    console.log(`Buttons   ${JSON.stringify(buttons)}`);
  });

  function addRaise(event) {
    let el;
    let increase = Number(event.target.getAttribute("amt"));
    if (increase + raiseAmount > dialogData.chips) {
      errorMessage = "You don't have enough money!";
    } else {
      console.log(`raiseAmount: ${raiseAmount} increase: ${increase} `);
      raiseAmount += increase;
      el =
        document.getElementById("raise") ||
        document.getElementById("see-raise");
      if (el.classList.contains("hide")) el.classList.remove("hide");
    }
  }

  function resetRaise(event) {
    console.log("Reset Raise");
    raiseAmount = 0;
    let el =
      document.getElementById("raise") || document.getElementById("see-raise");
    if (!el.classList.contains("hide")) el.classList.add("hide");
  }

  function handleAction() {
    if (dialogCallback) {
      let action = event.target.getAttribute("action");
      console.log(`Callback = ${action} ${raiseAmount}`);
      dialogCallback({
        action,
        raiseAmount
      });
    }
    endDialog();
  }
</script>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
  }

  .title {
    text-align: center;
    font-weight: bold;
    padding-top: 10px;
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

  .flexCol {
    display: flex;
    flex-direction: column;
  }

  .bet {
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 2px;
    margin-bottom: 20px;
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

  .cbtn {
    display: block;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 1px solid red;
  }

  .bred {
    background-color: maroon;
    color: white;
  }
  .bgreen {
    background-color: green;
    color: white;
  }
  .bblack {
    background-color: black;
    color: white;
  }
  .resetbtn {
    /* display: block; */
    height: 40px;
    width: 80px;
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 0px;
  }

  .hide {
    display: none;
  }

  .error {
    text-align: center;
    font-weight: bolder;
    color: red;
  }
</style>

<div class="wrap" pup="dlg-bet" {pupdata}>
  <div class="title">What to do?</div>
  <div class="container">
    <div class="flexCol">
      {#if dialogData.sumRaises > 0}
        <div class="bet">Raise to you: ${fAmount(dialogData.sumRaises)}</div>
      {/if}
      {#if dialogData.allowRaise && raiseAmount > 0}
        <div id="my-raise" class="bet">Your Raise: ${fAmount(raiseAmount)}</div>
      {/if}
      <div class="bet">Chips: ${fAmount(dialogData.chips)}</div>
    </div>
    {#if dialogData.allowRaise}
      <div>
        <button class="cbtn" amt="10" on:click={addRaise}>10¢</button>
        <button class="cbtn bgreen" amt="25" on:click={addRaise}>25¢</button>
      </div>
      <div>
        <button class="cbtn bred" amt="50" on:click={addRaise}>50¢</button>
        <button class="cbtn bblack" amt="100" on:click={addRaise}>$1.00</button>
      </div>
      <button class="resetbtn" on:click={resetRaise}>RESET</button>
    {/if}
    <div id="cccc" class="flexCol">
      {#each buttons as b}
        <button
          action={b.action}
          id={b.action}
          class={b.cls}
          on:click={handleAction}>
          {b.desc}
        </button>
      {/each}
    </div>
  </div>

  <div class="error">{errorMessage}</div>
</div>
