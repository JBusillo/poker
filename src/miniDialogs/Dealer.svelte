<script>
  import { infoChips, myActions } from "../support/Communication";
  import { registerDump } from "../support/Dumper.js";
  import BuyIn from "../miniDialogs/BuyIn.svelte";
  import { onMount } from "svelte";

  export let me;

  let gameGroup = null;
  let localMiniDialog = null;
  let errorMessage = "";
  let ante = 0;

  let games = [
    "Texas Hold 'em",
    "Obama-ha",
    // "Obama-ha High Chicago",
    // "Obama-ha Low Chicago",
    "Pineapple"
    // "Five Card Draw",
    // "Five Card Stud",
    // "Seven Card Stud"
  ];

  onMount(() => {
    gameGroup = "Texas Hold 'em";

    return registerDump(
      "Dealer.svelte",
      gameGroup,
      localMiniDialog,
      errorMessage,
      ante
    );
  });

  function addAnte(event) {
    errorMessage = "";
    let increase = Number(event.target.getAttribute("amt"));
    if (increase + ante > $infoChips) {
      errorMessage = "You don't have enough money!";
    } else {
      ante += increase;
    }
  }

  function resetAnte() {
    ante = 0;
  }

  function buyIn() {
    localMiniDialog = "BuyIn";
  }

  function buyInCb() {
    localMiniDialog = null;
  }

  function submit(event) {
    let id = event.currentTarget.id;
    let data = null;
    switch (id) {
      case "dl-ok":
        if (!gameGroup) {
          errorMessage = "A game must be selected.  Please correct";
          return;
        }
        if (ante === 0) {
          errorMessage = "Ante is zero.  Please correct";
          return;
        }
        data = { game: gameGroup, anteAmount: ante, action: "accept" };
        break;
      case "dl-pass":
        data = { action: "pass" };
        break;
    }

    me.cb(data);
    myActions.set({ type: "MyActions", miniDialog: "default" });
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

  .games {
    background-color: darkgray;
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

  .ante {
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

{#if localMiniDialog}
  {#if localMiniDialog === 'BuyIn'}
    <BuyIn cb={buyInCb} />
  {/if}
{:else}
  <div id="dlr-div" class="wrap">
    <!-- <div id="dlr-div" pup="dlg-dealer" class="wrap"> -->
    <div class="title">Set Game and Ante Amount</div>
    <div class="container">
      <div class="games">
        {#each games as game}
          <label>
            <input type="radio" bind:group={gameGroup} value={game} />
            {game}
          </label>
        {/each}
      </div>
      <div class="acontainer">
        <div class="flexRow">
          <div class="ante">Ante: {fAmount(ante)}</div>
          <div class="ante">Chips: {fAmount($infoChips)}</div>
        </div>
        <div>
          <button class="cbtn" amt="10" on:click={addAnte}>10¢</button>
          <button class="cbtn bgreen" amt="25" on:click={addAnte}>25¢</button>
        </div>
        <div>
          <button class="cbtn bred" amt="50" on:click={addAnte}>50¢</button>
          <button class="cbtn bblack" amt="100" on:click={addAnte}>
            $1.00
          </button>
        </div>
        <button class="resetbtn" on:click={resetAnte}>RESET</button>
      </div>
      <div id="cccc" class="flexCol">
        <button id="dl-buyin" class="btn" on:click={buyIn}>Buy In</button>
        <button id="dl-pass" class="btn" on:click={submit}>Pass</button>
        <button id="dl-ok" class="btn" on:click={submit}>OK</button>
      </div>
    </div>
    <div class="error">{errorMessage}</div>
  </div>
{/if}
