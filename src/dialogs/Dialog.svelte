<script>
  import { onMount, beforeUpdate } from 'svelte'
  import { setDialogCb } from '../support/Communication'

  import Dealer from './Dealer.svelte'
  import SignIn from './SignIn.svelte'
  import Ante from './Ante.svelte'
  import BuyIn from './BuyIn.svelte'
  import Bet from './Bet.svelte'
  export let endDialog
  export let dialogData
  export let dialogCallback
  let dialogMap
  let comp
  let dynProps = {}
  let item

  onMount(() => {
    createMap()
  })

  beforeUpdate(() => {
    createMap()
    item = dialogMap.get(dialogData.dialog)
    comp = item.component

    if (item.data) {
      dynProps = { ...dynProps, dialogData }
    }
    if (item.cb) {
      dynProps = { ...dynProps, dialogCallback }
    }

    console.log(`Dialog dynProps=${JSON.stringify(dynProps)}`)
  })

  function createMap() {
    // component: component name
    // data: true if data passed to the component
    // cb: is callback is passed to the component
    // ma: if true, place dialog in "My Actions" grid space.  Default is full-screen.
    if (!dialogMap) {
      dialogMap = new Map()
      dialogMap.set('Dealer', {
        component: Dealer,
        data: true,
        cb: true,
        class: 'abs',
      })
      dialogMap.set('SignIn', {
        component: SignIn,
        data: false,
        cb: false,
        class: 'abs',
      })
      dialogMap.set('Ante', {
        component: Ante,
        data: true,
        cb: true,
        class: 'abs',
      })
      dialogMap.set('BuyIn', {
        component: BuyIn,
        data: true,
        cb: true,
        class: 'abs',
      })
      dialogMap.set('Bet', {
        component: Bet,
        data: true,
        cb: true,
        class: 'ma',
      })
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

  .ma {
    grid-area: MA;
    background-color: lightyellow;
    min-height: 0;
  }
</style>

<div class={item.class}>
  <svelte:component this={comp} {endDialog} {...dynProps} />
</div>
