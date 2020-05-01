<script>
  import { setMyLineCb } from "./support/Communication";
  import { onMount } from "svelte";
  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyActions from "./MyActions.svelte";
  export let me;

  onMount(() => {
    console.log("myLine onMount");
    setMyLineCb(value => {
      console.log(`MyLineCb  {JSON.stringify(value)}`);
      me = value;
    });
  });

  // let allCards = [];
  // tableData.tableCards.forEach(card => {
  //   allCards.push({ card, selected: false, set: "table" });
  // });
  // tableData.myCards.forEach(card => {
  //   //    tableData.myCards.forEach(card => {
  //   allCards.push({ card, selected: false, set: "myCards" });
  // });

  // function select(event) {
  //   let card = event.target.getAttribute("card");
  //   let thisCard = allCards.find(e => e.card === card);

  //   if (thisCard.set === "myCards") {
  //     if (thisCard.selected) {
  //       (thisCard.selected = false), selectCount--;
  //       selectMine--;
  //     } else {
  //       if (selectCount < 5) {
  //         (thisCard.selected = true), selectCount++;
  //         selectMine++;
  //       }
  //     }
  //   }

  //   if (thisCard.set === "table") {
  //     if (thisCard.selected) {
  //       (thisCard.selected = false), selectCount--;
  //       selectMine--;
  //     } else {
  //       if (selectCount < 5) {
  //         (thisCard.selected = true), selectCount++;
  //         selectMine++;
  //       }
  //     }
  //   }

  //   allCards = allCards;
  // }
</script>

<style>

</style>

<MyCards {me} />
<TableCards cards={['XXX', 'XXX', 'XXX', 'XXX', 'XXX']} />
<MyActions {me} />
