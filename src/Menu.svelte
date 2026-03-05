<script lang="ts">
    import type { ConnectionType } from "./data";
    import { randomString } from "./lib/util";

    let userId: string = ''
    let partialSessionId: string = ''
    
    export let onStart: ((data: {connectionType: ConnectionType, userId: string, partialSessionId: string}) => void) | undefined

    function start(connectionType: ConnectionType, partialSessionId: string) {
        onStart?.({connectionType, userId, partialSessionId})
    }

    $: canHost = !!userId
    $: canClient = !!userId && partialSessionId.length === 4
</script>

<div class="menu">
    <div class="section">
        <label>
            Name
            <input bind:value={userId} />
        </label>
    </div>

    <div class="columns">

        <div class="section">
            <button disabled={!canHost} on:click={() => canHost && start('host', randomString(4))}>Start Game</button>
        </div>

        <div class="section">
            <p>
                <label>
                    Game ID
                    <input class="game-id" bind:value={partialSessionId} />
                </label>
            </p>

            <button disabled={!canClient} on:click={() => canClient && start('client', partialSessionId)}>Join Game</button>
        </div>

        {#if import.meta.env.DEV}
            <div class="section">
                <button on:click={() => start('mock', '')}>Mock Game</button>  
            </div>
        {/if}

    </div>
</div>

<style>
    .menu {
        font-size: 1.5em;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .columns {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 1em;
    }

    .section {
        display: grid;
        place-items: center;
        padding: 1em;
        background-color: #333;
        border-radius: 1em;
    }

    .game-id {
        width: 4em;
    }
</style>