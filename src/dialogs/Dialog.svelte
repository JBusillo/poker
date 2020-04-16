<script>
  import { onMount, beforeUpdate } from "svelte";
  import { setDialogCb } from "../support/Communication";

  import Dealer from "./Dealer.svelte";
  import SignIn from "./SignIn.svelte";
  import Ante from "./Ante.svelte";
  import BuyIn from "./BuyIn.svelte";
  export let endDialog;
  export let dialogData;
  export let dialogCallback;
  let dialogMap;
  let comp;
  let dynProps = {};

  onMount(() => {
    createMap();
  });

  beforeUpdate(() => {
    createMap();
    let item = dialogMap.get(dialogData.dialog);
    comp = item.component;
    if (item.data) {
      dynProps = { ...dynProps, dialogData };
    }
    if (item.cb) {
      dynProps = { ...dynProps, dialogCallback };
    }
  });

  function createMap() {
    if (!dialogMap) {
      dialogMap = new Map();
      dialogMap.set("Dealer", { component: Dealer, data: true, cb: true });
      dialogMap.set("SignIn", { component: SignIn, data: false, cb: false });
      dialogMap.set("Ante", { component: Ante, data: true, cb: true });
      dialogMap.set("BuyIn", { component: BuyIn, data: true, cb: true });
    }
  }
</script>

<style>
  .abs {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    background-color: antiquewhite;
  }
</style>

<div class="abs">
  <svelte:component this={comp} {endDialog} {...dynProps} />
</div>
