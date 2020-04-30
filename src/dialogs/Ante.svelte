<script>
  import { getSocket, setDialog } from "../support/Communication";

  export let endDialog;
  export let dialogData;
  export let dialogCallback;
  let errorMessage = "";

  //expect  {dialog='Ante', game=(game), chips=(amt), anteAmount=(amt)}
  //result  {action=pay/pass/break}
  //sub-dialog buyin
  function fante(ante) {
    return `$${(ante / 100).toFixed(2)}`;
  }

  function payAnte(event) {
    if (dialogCallback) {
      dialogCallback({ action: "pay" });
    }
    endDialog();
  }

  function buyIn(event) {
    setDialog({
      dialog: "BuyIn",
      return: {
        data: dialogData,
        callback: dialogCallback
      }
    });
  }

  function skipRound(event) {
    if (dialogCallback) {
      dialogCallback({ action: "pass" });
    }
    endDialog();
  }

  function takeBreak(event) {
    if (dialogCallback) {
      dialogCallback({ action: "break" });
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
    align-items: center;
  }

  .error {
    text-align: center;
    font-weight: bolder;
    color: red;
  }
</style>

<div class="wrap">
  <div id="pup-ante" class="title">Time to Ante-Up</div>
  <div>Game is {dialogData.game}</div>
  <div>Ante amount is {fante(dialogData.anteAmount)}</div>
  <div class="flexCol">
    <button id="pup-payante" class="btn" on:click={payAnte}>
      Pay the ante
    </button>
    <button class="btn" on:click={buyIn}>Buy more chips</button>
    <button class="btn" on:click={skipRound}>Skip this round</button>
    <button class="btn" on:click={takeBreak}>Go on a break</button>
  </div>
  <div class="error">{errorMessage}</div>
</div>
