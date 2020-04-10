<script>
  import { config } from "src/support/config";

  let selectedGame = null;
  let gameGroup = null;
  let errorMessage = "";

  let games = [
    "Texas Hold 'em",
    "Obama-ha",
    "Obama-ha High Chicago",
    "Obama-ha Low Chicago",
    "Pineapple",
    "Five Card Draw",
    "Five Card Stud",
    "Seven Card Stud"
  ];

  let ante = 0;
  let fante = "$0.00";

  function addAnte(event) {
    ante += Number(event.target.getAttribute("amt"));
    fante = `$${(ante / 100).toFixed(2)}`;
  }

  function resetAnte(event) {
    ante = 0;
    fante = "$0.00";
  }

  function submit() {
    console.log(gameGroup);
    if (!gameGroup) {
      errorMessage = "A game must be selected.  Please correct";
      return;
    }

    if (ante === 0) {
      errorMessage = "Ante is zero.  Please correct";
      return;
    }

    let url =
      `${config.server}/addPlayer?player=${lname}` +
      (uuid ? `&uuid=${uuid}` : "");
    fetch(url)
      .then(res => res.json())
      .then(data => {
        window.sessionStorage.setItem("uuid", data.uuid);
        window.sessionStorage.setItem("name", lname);
        cbSignIn();
      })
      .catch(err => {
        console.log("There was an error");
        console.log(err);
      });
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
      <div class="ante">Ante: {fante}</div>
      <div>
        <button class="cbtn" amt="10" on:click={addAnte}>10¢</button>
        <button class="cbtn bgreen" amt="25" on:click={addAnte}>25¢</button>
      </div>
      <div>
        <button class="cbtn bred" amt="50" on:click={addAnte}>50¢</button>
        <button class="cbtn bblack" amt="100" on:click={addAnte}>$1.00</button>
      </div>
      <button class="resetbtn" on:click={resetAnte}>RESET</button>
    </div>
    <button class="btn" on:click={submit}>OK</button>
  </div>
  <div class="error">{errorMessage}</div>
</div>
