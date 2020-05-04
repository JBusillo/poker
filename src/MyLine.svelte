<script>
  import { setMyLineCb } from "./support/Communication";
  import { onMount } from "svelte";
  import TableCards from "./TableCards.svelte";
  import MyCards from "./MyCards.svelte";
  import MyActions from "./MyActions.svelte";

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

<!-- <MyCards {me} />       ===> Deleted for Store Test           -->
<MyCards />
<TableCards />
<MyActions />
