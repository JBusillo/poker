<script>
  import { getSocket } from "../support/Communication";
  export let endDialog;
  export let dialogData;
  let errorMessage = "";

  let buyin = 0;
  let fbuyin = "$0.00";

  function doBuyIn(event) {
    let amt = Number(event.target.getAttribute("amt"));
    let uuid = window.sessionStorage.getItem("uuid");

    getSocket().emit(
      "ClientMessage",
      { msgType: "doBuyIn", amount: amt, uuid },
      function(data) {
        // console.log(`data   ${JSON.stringify(data)}`);
        if (
          dialogData &&
          dialogData.return &&
          ["Dealer", "Ante"].includes(dialogData.return.data.dialog)
        ) {
          dialogData.return.data.chips = data.chips;
        }
        endDialog(dialogData);
      }
    );
  }

  function doCancel(event) {
    endDialog(dialogData);
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
    flex-direction: column;
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
</div>
