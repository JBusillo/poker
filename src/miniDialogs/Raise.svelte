<script>
  import { getSocket, setDialog } from "../support/Communication";
  import { onMount } from "svelte";

  export let raiseCb;
  export let me;

  let raise = 0;
  let errorMessage = "";

  onMount(() => {
    let raise = 0;
    let errorMessage = "";
  });

  function addRaise(event) {
    let increase = Number(event.currentTarget.getAttribute("amt"));
    if (increase + raise + me.raiseAmount > me.chips) {
      errorMessage = "You don't have enough money!";
    } else {
      raise += increase;
    }
  }

  function submit() {
    switch (event.currentTarget.id) {
      case "rs-reset":
        raise = 0;
        break;
      case "rs-cancel":
        raiseCb({ action: "cancel" });
        break;
      case "rs-ok":
        if (raise === 0) {
          errorMessage = "Raise is zero.  Please correct";
          break;
        }
        raiseCb({ action: "raise", raiseAmount: raise });
        break;
    }
  }

  function fAmount(amt) {
    return `${(amt / 100).toFixed(2)}`;
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
    justify-content: space-around;
    align-items: center;
  }

  .container > * {
    margin: 10px;
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

  .acontainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .acontainer div {
    display: flex;
    flex-direction: row;
  }

  .raise {
    border-radius: 5px;
    border: 2px solid black;
    font-weight: bold;
    padding: 2px;
    margin-bottom: 20px;
  }

  .flexCol {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flexRow {
    display: flex;
    flex-direction: row;
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

  .error {
    text-align: center;
    font-weight: bolder;
    color: red;
  }
</style>

<div id="dlr-div" pup="dlg-dealer" class="wrap">
  <div class="title">Raise</div>
  <div class="container">
    <div class="acontainer">
      <div class="flexRow">
        <div class="raise">Raise: {fAmount(raise)}</div>
        <div class="raise">Chips: {fAmount(me.chips)}</div>
      </div>
      <div>
        <button class="cbtn" amt="10" on:click={addRaise}>10¢</button>
        <button class="cbtn bgreen" amt="25" on:click={addRaise}>25¢</button>
      </div>
      <div>
        <button class="cbtn bred" amt="50" on:click={addRaise}>50¢</button>
        <button class="cbtn bblack" amt="100" on:click={addRaise}>$1.00</button>
      </div>
      <button id="rs-reset" class="btn" on:click={submit}>RESET</button>
    </div>
    <div id="cccc" class="flexCol">
      <button id="rs-ok" class="btn" on:click={submit}>Raise</button>
      <button id="rs-cancel" class="btn" on:click={submit}>Cancel</button>
    </div>
  </div>
  <div class="error">{errorMessage}</div>
</div>
