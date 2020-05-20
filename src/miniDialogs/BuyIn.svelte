<script>
  import { getSocket, infoChips } from "../support/Communication";
  import { registerDump } from "../support/Dumper.js";
  import { onMount } from "svelte";

  //  import BuyIn from "./miniDialogs/BuyIn.svelte";
  export let cb;

  let errorMessage = "";

  onMount(() => {
    return registerDump("BuyIn.svelte", errorMessage);
  });

  function doBuyIn(event) {
    let amt = Number(event.target.getAttribute("amt"));
    let uuid = window.sessionStorage.getItem("uuid");
    getSocket().emit(
      "ClientMessage",
      { msgType: "doBuyIn", amount: amt, uuid },
      function(data) {
        infoChips.set(data.chips);
        if (data.errorMessage) {
          errorMessage = data.errorMessage;
        } else {
          cb();
        }
      }
    );
  }

  function doCancel() {
    cb();
  }
</script>

<style>
  .wrap {
    display: flex;
    flex-direction: row;
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

  .btn {
    background-color: cadetblue;
    height: 50px;
    width: 100px;
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

<div class="wrap" pup="dlg-buyin">
  <div class="title">Buy-In</div>
  <div class="container">
    <button id="by-500" class="btn" amt="500" on:click={doBuyIn}>
      Buy-In for $5.00
    </button>
    <button id="by-1000" class="btn" amt="1000" on:click={doBuyIn}>
      Buy-In for $10.00
    </button>
    <button id="by-cancel" class="btn" on:click={doCancel}>Cancel</button>
  </div>
  <div class="error">{errorMessage}</div>

</div>
