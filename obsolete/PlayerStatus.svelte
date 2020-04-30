<script>
    import { getSocket, setPlayerStatusCb, setDialog } from './support/Communication';
    import { onMount, beforeUpdate } from 'svelte';

    export let size;

    let playerStatus;
    let options;

    onMount(() => {
        setPlayerStatusCb(data => {
            playerStatus = data.players;
            options = data.options;
        });
    });

    beforeUpdate(() => {
        console.log(`playerStatus: ${JSON.stringify(playerStatus)} `);
    });

    async function Begin() {
        getSocket().emit('ClientMessage', { msgType: 'beginTable' }, function(data) {
            console.log('CB from beginTable');
        });
    }

    async function Buyin() {
        setDialog({ dialog: 'BuyIn' }, null);
    }
</script>

<style>
    .gridPlayerStatus {
        grid-area: PS;
        background-color: lightgrey;
    }

    .playerGrid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 2fr;
        grid-gap: 0px;
    }

    .playerGridItem {
        border: 2px;
        border-style: solid;
    }
</style>

{#if size === 'L'}
    <div class="gridPlayerStatus">
        <h1>Players</h1>
        <div>
            {#if playerStatus}
                <div>
                    <div class="playerGrid">
                        <div>Name</div>
                        <div>Chips</div>
                        <div>Buy-In</div>
                        <div>Status</div>
                        {#each playerStatus as p}
                            <div class="playerGridItem">{p.name}</div>
                            <div class="playerGridItem">{p.chips}</div>
                            <div class="playerGridItem">{p.buyin}</div>
                            <div class="playerGridItem">{p.status}</div>
                        {/each}
                    </div>
                    <div>
                        {#if options && options.hasBegun === false}
                            <button id="ps-begin" on:click={Begin}>Begin</button>
                            <button id="ps-buyin" on:click={Buyin}>Buy In</button>
                        {/if}
                    </div>
                </div>
            {:else}
                <div>No Players...</div>
            {/if}
        </div>
    </div>
{/if}
