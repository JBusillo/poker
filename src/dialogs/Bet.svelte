<script>
  import { getSocket } from "../support/Communication";
  import { beforeUpdate } from "svelte";
  export let endDialog;
  export let dialogData;
  export let dialogCallback;
  let errorMessage = "";

  // dialogData.dialog = "Bet"
  // dialogData.chips = player chip amount (available to bet)
  // dialogData.sumRaises = total raise amount for this round
  // dialogData.alreadyPaid = amount already paid towards sumRaises
  // dialogData.allowRaise = allow player to raise

  //result.action = check/fold/see/raise/see-raise (side-pot?)
  //result.raiseAmount = Raise amount.  only applies to raise and see-raise
  //result.paidAmount = paid into pot (for this rotation)

  let buttons = [];
  let raiseAmount = 0;
  let paidAmount = 0;
  let fraiseAmount = "$0.00";

  beforeUpdate(() => {
    console.log("in Bet: before Update");
    buttons = [];
    console.log(
      `in Bet, allowRaise:${dialogData.allowRaise} sumRaises:${dialogData.sumRaises} alreadyPaid${dialogData.alreadyPaid}`
    );
    console.log(`in Bet   ${dialogData.sumRaises}`);
    if (dialogData.allowRaise) {
      if (dialogData.sumRaises > dialogData.alreadyPaid) {
        buttons.push({ action: "see", desc: "See" });
        buttons.push({ action: "see-raise", desc: "See and Raise" });
        buttons.push({ action: "fold", desc: "Fold" });
      } else {
        buttons.push({ action: "check", desc: "Check" });
        buttons.push({ action: "raise", desc: "Raise" });
      }
    } else {
      // can only fold or see
      buttons.push({ action: "see", desc: "See" });
      buttons.push({ action: "fold", desc: "Fold" });
    }
    buttons = buttons;
  });

  function addRaise(event) {
    let increase = Number(event.target.getAttribute("amt"));
    if (increase + raiseAmount > dialogData.chips) {
      errorMessage = "You don't have enough money!";
    } else {
      raiseAmount += increase;
      fraiseAmount = `$${(raiseAmount / 100).toFixed(2)}`;
    }
  }

  function resetRaise(event) {
    fraiseAmount = 0;
    fbet = "$0.00";
  }

  function handleAction() {
    console.log("in handleAction");
    if (dialogCallback) {
      let action = event.target.getAttribute("action");
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

  .error {
    text-align: center;
    font-weight: bolder;
    color: red;
  }
</style>

<div class="wrap">
  <div id="pup-bet" class="title">What to do?</div>
  <div class="container">
    <div class="flexRow">
      <div class="bet">Raise: {fraiseAmount}</div>
      <div class="bet">Chips: {`$${(dialogData.chips / 100).toFixed(2)}`}</div>
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
          id={'pup-' + b.action}
          class="btn"
          on:click={handleAction}>
          {b.desc}
        </button>
      {/each}
    </div>
  </div>

  <div class="error">{errorMessage}</div>
</div>
